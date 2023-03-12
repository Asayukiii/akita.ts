import type { ClientOptions, GuildMember, Interaction, Message, PartialGuildMember } from "discord.js"
import type { Data, Command, CommandType } from "../../index"
import member_remove_event from "../handlers/member_remove"
import member_add_event from "../handlers/member_add"
import int_event, { InteractionEventOptions } from "../handlers/interaction"
import { Interpreter } from "./interpreter"
import msg_event, { MessageEventOptions } from "../handlers/message"
import { Timeouts } from "midou.ts"
import { Client } from "discord.js"
import { Utils } from "./utils"
import { cwd } from "process"

export class AkitaClient extends Client {
    public timeouts = new Timeouts({ restore: true });
    private interpreter = new Interpreter();
    public prefixes: string[] | null = null;
    public cbs: Record<string, string> = {};
    public commands: Command[] = [];
    constructor(options: ClientOptions, prefixes: string) {
        super(options);
        this.prefixes = Array.isArray(prefixes) ? prefixes : [prefixes];
        this.timeouts.on("expires", async (t) => {
            await this.resolve(t.data.code, { metadata: { vars: t.data.data } }, this);
        });
        this.timeouts.start();
        this.on("ready", (t) => {
            console.log(`${"DEBUG".bgBlue} ${"-> Bot ready as".gray} ${(t.user?.tag || "unknown#0000").bgBlue}`)
            setTimeout(() => this.isReady() || console.log("CLIENT CAN NOT START!".bgRed), 1e4);
        });
        this.on("functionError", (error: Error, d: Data) => {
            console.log(`${"InternalError".bgRed} ${"in".gray} ${(d.func?.total || "unknown").bgRed}${":".gray}\n    ${">".gray} ${(error.stack || "Without Stack").gray}`)
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async resolve(code: string, data: Record<string | number | symbol, any> | undefined, client: AkitaClient = this): Promise<Data | undefined> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await this.interpreter.parse(code, data, client);
    }
    public readyCommand(code: string): this {
        return this.on("ready", () => { this.resolve(code, undefined, this) });
    }
    public onFunctionError(code: string) {
        this.removeAllListeners("functionError");
        return this.on("functionError", (error: Error, data: Data) => {
            data.metadata.vars.error = error;
            this.resolve(code, data, this);
        })
    }
    public onGuildMemberAdd(): this {
        return this.on("guildMemberAdd", (member: GuildMember) => {
            member_add_event(member, this);
        });
    }
    public onGuildMemberRemove(): this {
        return this.on("guildMemberRemove", (member: GuildMember | PartialGuildMember) => {
            member_remove_event(member, this);
        });
    }
    public onMessageCreate(options?: MessageEventOptions): this {
        return this.on("messageCreate", (msg: Message) => {
            msg_event(msg, this, options);
        });
    }
    public onInteractionCreate(options: InteractionEventOptions): this {
        return this.on("interactionCreate", (int: Interaction) => {
            int_event(int, this, options);
        });
    }
    public addCommand(cmd: Command): this {
        cmd.type = cmd.type.trim().toUpperCase().replace(/ +/g, "_") as CommandType
        cmd.names = Array.isArray(cmd.names) ? cmd.names : [cmd.names] as unknown as string[]
        console.log(`${"DEBUG".bgBlack} ${"-> Loaded".gray} ${cmd.names[0].bgWhite} ${"as".gray} ${cmd.type.bgWhite}!`)
        return this.commands.push(cmd), this
    }
    public addCommands(cmds: Command[]) {
        return cmds.forEach((cmd) => this.addCommand(cmd)), this
    }
    public loadCommands(folder: string, initial: string = cwd()) {
        Utils.LoadFiles(folder, initial).then(res => {
            res.forEach(async el => {
                try {
                    let cmds = await import(el.name)
                    cmds = Array.isArray(cmds) ? cmds : [cmds]
                    for (const cmd of cmds) this.addCommand(cmd)
                } catch (error) {
                    console.log(`${"LoaderError".bgRed} ${"in".gray} ${(el.name || "unknown").bgRed}${":".gray}\n    ${">".gray} ${((error as Error).stack || "Without Stack").gray}`)
                }
            })
        })
    }
    public getCommands(type: CommandType, name: string, method: "filter" | "find" = "find"): Command[] | Command | undefined {
        return this.commands[method](
            (command: Command) => command.type === type && command.names?.includes(name)
        );
    }
    public addCallback(name: string, code: string) {
        this.cbs[name] = code;
    }
}
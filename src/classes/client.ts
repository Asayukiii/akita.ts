import type { ClientOptions, GuildMember, Interaction, Message, PartialGuildMember } from "discord.js";
import type { Data, Command, CommandType } from "../../index";
import member_remove_event from "../handlers/member_remove";
import member_add_event from "../handlers/member_add";
import int_event from "../handlers/interaction";
import { Interpreter } from "./interpreter";
import msg_event from "../handlers/message";
import { Timeouts } from "midou.ts";
import { Client } from "discord.js";
import { Utils } from "./utils";
import { cwd } from "process";

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
            this.interpreter.parse("$log[DEBUG;Bot Ready as $data[client;user;tag]!!]", undefined, t as AkitaClient);
            setTimeout(() => this.isReady() || console.log("CLIENT CAN NOT START!".bgRed), 1e4);
        });
        this.on("functionError", (error: Error, d: Data) => {
            console.log(`${"InternalError".bgRed} ${"in".gray} ${(d.func?.total || "unknown").bgRed}${":".gray}\n    ${">".gray} ${(error.stack || "Without Stack").gray}`)
        })
    };
    async resolve(code: string, data: Record<string | number | symbol, any> | undefined, client: AkitaClient = this): Promise<Data | undefined> {
        // @ts-ignore
        return await this.interpreter.parse(code, data, client);
    };
    public readyCommand(code: string): this {
        return this.on("ready", () => { this.resolve(code, undefined, this) });
    };
    public onFunctionError(code: string) {
        this.removeAllListeners("functionError");
        return this.on("functionError", (error: Error, data: Data) => {
            data.metadata.vars.error = error;
            this.resolve(code, data, this);
        })
    };
    public onGuildMemberAdd(): this {
        return this.on("guildMemberAdd", (member: GuildMember) => {
            member_add_event(member, this);
        });
    };
    public onGuildMemberRemove(): this {
        return this.on("guildMemberRemove", (member: GuildMember | PartialGuildMember) => {
            member_remove_event(member, this);
        });
    };
    public onMessageCreate(options?: {
        bots: boolean
    }): this {
        return this.on("messageCreate", (msg: Message) => {
            msg_event(msg, this, options);
        });
    };
    public onInteractionCreate(): this {
        return this.on("interactionCreate", (int: Interaction) => {
            int_event(int, this);
        });
    };
    public addCommand({ names, type, code }: { names: string | string[]; type: CommandType; code: string; }): this {
        type = type.trim().toUpperCase().replace(/ +/g, "_") as CommandType;
        names = Array.isArray(names) ? names : [names];
        console.log(`${"DEBUG".bgBlack} ${"-> Loaded".gray} ${names[0].bgWhite} ${"as".gray} ${type.bgWhite}!`);
        return this.commands.push({
            names, type, code
        }), this;
    };
    public addCommands(cmds: { names: string | string[]; type: CommandType; code: string; }[]) {
        return cmds.forEach(this.addCommand), this;
    };
    public loadCommands(folder: string, initial: string = cwd()) {
        Utils.LoadFiles(folder, initial).then(res => {
            res.forEach(el => {
                try {
                    const cmd = require(el.name);
                    this.addCommands(Array.isArray(cmd) ? cmd : [cmd]);
                } catch (error: any) {
                    console.log(`${"LoaderError".bgRed} ${"in".gray} ${(el.name || "unknown").bgRed}${":".gray}\n    ${">".gray} ${(error.stack || "Without Stack").gray}`)
                };
            });
        });
    };
    public getCommands(type: CommandType, name: string, method: "filter" | "find" = "find"): Command[] | Command | undefined {
        return this.commands[method](
            (command: Command) => command.type === type && command.names?.includes(name)
        );
    };
    public addCallback(name: string, code: string) {
        this.cbs[name] = code;
    };
};
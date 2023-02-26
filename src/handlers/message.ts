import type { AkitaClient } from "../classes/client";
import { Context } from "../classes/context";
import type { Message } from "discord.js";
import { Command } from "index";

export default async function (msg: Message, client: AkitaClient, options?: any) {
    let ctx = new Context(msg),
        prefixes = client.prefixes?.map(async prefix => {
            if (prefix.includes("$")) return (await client.resolve(prefix, { metadata: { msg, prefix, ctx } }))?.code
            return prefix
        }),
        prefix = await prefixes?.find(async prefix => msg.content.startsWith((await prefix)!)),
        any_exec = client.getCommands("MESSAGE", "$any", "filter") as Command[];
    if (any_exec.length && (options?.bots == true ? true : !msg.author.bot)) {
        let args = msg.content.trim().split(/ +/g);
        for (let cmd of any_exec) {
            client.resolve(cmd.code, { metadata: { cmd: cmd, args, msg, ctx } }, client);
        };
    };
    if (prefix && (options?.bots || !msg.author.bot)) {
        let args = msg.content.slice(prefix.length).trim().split(/ +/g),
            cmd = args.shift()?.toLocaleLowerCase();
        if (cmd) {
            let to_exec_commands = client.getCommands("MESSAGE", cmd, "filter"),
                data = { metadata: { msg, args, cmd, ctx } };
            if (to_exec_commands) {
                for (let to_exec of to_exec_commands as Command[]) {
                    client.resolve(to_exec.code, data, client);
                };
            };
        };
    };
};
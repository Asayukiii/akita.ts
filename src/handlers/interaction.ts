import { Interaction, CommandInteraction } from "discord.js";
import type { AkitaClient } from "../classes/client";
import { Context } from "../classes/context";

export default function (int: Interaction, client: AkitaClient) {
    let cmds = client.commands.filter((cmd) => cmd.type.toUpperCase() == "INTERACTION"),
        ctx = new Context(int);
    if (int instanceof CommandInteraction) {
        let to_exec = cmds.find((c) => c.names?.includes(int.command?.name!));
        if (to_exec) {
            client.resolve(to_exec.code, { metadata: { int, cmd: to_exec, ctx } }, client);
        };
    } else {
        for (let cmd of cmds) {
            client.resolve(cmd.code, { metadata: { int, cmd, ctx } }, client);
        }
    }
};
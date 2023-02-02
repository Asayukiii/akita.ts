import { GuildMember } from "discord.js";
import type { AkitaClient } from "../classes/client";
import { Context } from "../classes/context";

export default function (member: GuildMember, client: AkitaClient) {
    let cmds = client.commands.filter((cmd) => cmd.type.toUpperCase() == "MEMBER_ADD"),
        ctx = new Context(member);
    for (let cmd of cmds) {
        client.resolve(cmd.code, { metadata: { member, cmd, ctx } }, client);
    }
};
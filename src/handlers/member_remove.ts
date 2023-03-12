import { GuildMember, PartialGuildMember } from "discord.js"
import type { AkitaClient } from "../classes/client"
import { Context } from "../classes/context"
import { Data, Metadata } from "index"
import { merge } from "lodash"

export interface MemmberRemoveEventOptions {
    bots?: boolean
    before?: string
}

export default async function (member: GuildMember | PartialGuildMember, client: AkitaClient, options: MemmberRemoveEventOptions) {
    const cmds = client.commands.filter((cmd) => cmd.type.toUpperCase() == "MEMBER_REMOVE"),
        ctx = new Context(member),
        base_data: Partial<Data> = { metadata: { member, ctx } }
    if (typeof options?.before === "string") {
        merge(base_data, await client.resolve(options.before, base_data))
    }
    for (const cmd of cmds) {
        (base_data.metadata as Metadata).cmd = cmd
        client.resolve(cmd.code, base_data, client)
    }
}
import type { AkitaClient } from "../classes/client"
import { Context } from "../classes/context"
import { GuildMember } from "discord.js"
import { Data, Metadata } from "index"
import { merge } from "lodash"

export interface MemmberAddEventOptions {
    bots?: boolean
    before?: string
}

export default async function (member: GuildMember, client: AkitaClient, options?: MemmberAddEventOptions) {
    const cmds = client.commands.filter((cmd) => cmd.type.toUpperCase() == "MEMBER_ADD"),
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
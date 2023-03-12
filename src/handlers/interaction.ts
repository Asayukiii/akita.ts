import { Interaction, CommandInteraction } from "discord.js"
import type { AkitaClient } from "../classes/client"
import { Context } from "../classes/context"
import { Data, Metadata } from "index"
import { merge } from "lodash"

export interface InteractionEventOptions {
    before?: string
}

export default async function (int: Interaction, client: AkitaClient, options?: InteractionEventOptions) {
    const cmds = client.commands.filter((cmd) => cmd.type.toUpperCase() == "INTERACTION"),
        ctx = new Context(int),
        base_data: Partial<Data> = { metadata: { int, ctx } }
        if (typeof options?.before === "string") {
            merge(base_data, await client.resolve(options.before, base_data))
        }
    if (int instanceof CommandInteraction) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const to_exec = cmds.find(c => c.names?.includes(int.command?.name as string));
        (base_data.metadata as Metadata).cmd = to_exec
        if (to_exec) {
            client.resolve(to_exec.code, base_data, client);
        }
    } else {
        for (const cmd of cmds) {
            (base_data.metadata as Metadata).cmd = cmd
            client.resolve(cmd.code, base_data, client)
        }
    }
}
import type { AkitaClient } from "../classes/client"
import { Context } from "../classes/context"
import type { Message } from "discord.js"
import { Command, Data } from "index"
import { merge } from "lodash"

export interface MessageEventOptions {
    bots: boolean
    before?: string
}

export default async function (msg: Message, client: AkitaClient, options?: MessageEventOptions): Promise<void> {
    if (options?.bots === false && msg.author.bot) return
    const ctx = new Context(msg),
        prefixes = client.prefixes?.map(async prefix => {
            if (prefix.includes("$")) return (await client.resolve(prefix, { metadata: { msg, prefix, ctx } }))?.code
            return prefix
        }),
        prefix = await prefixes?.find(async prefix => msg.content.startsWith((await prefix) as string)),
        any_exec = client.getCommands("MESSAGE", "$any", "filter") as Command[],
        base_args = msg.content.trim().split(/ +/g)
    const base_data: Partial<Data> = { metadata: { args: base_args, msg, ctx } }
    if (typeof options?.before === "string") {
        merge(base_data, await client.resolve(options.before, base_data))
    }
    if (any_exec.length) {
        for (const cmd of any_exec) {
            client.resolve(cmd.code, base_data, client)
        }
    }
    if (prefix) {
        const args = msg.content.slice(prefix.length).trim().split(/ +/g),
            cmd = args.shift()?.toLocaleLowerCase()
        if (cmd) {
            const to_exec_commands = client.getCommands("MESSAGE", cmd, "filter")
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            base_data.metadata!.cmd = cmd
            if (to_exec_commands) {
                for (const to_exec of to_exec_commands as Command[]) {
                    client.resolve(to_exec.code, base_data, client)
                }
            }
        }
    }
}
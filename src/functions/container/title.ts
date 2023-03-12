import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction } from "../../../index"
import type { EmbedBuilder } from "discord.js"

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("setTitle")
        .setValue("description", "sets the title of this embed")
        .setValue("use", "$setTitle[index;text;url?]")
        .setValue("fields", [{
            name: "index",
            description: "the index of the embed",
            type: "number[0,4]"
        }, {
            name: "text",
            description: "the title of the embed",
            type: "string"
        }, {
            name: "url",
            description: "the url of the embed",
            type: "string<URL>",
            optional: true
        }])
        .setValue("example", "$setTitle[0;discord!;https://discord.com/]")
        .setValue("returns", "Void"),
    code: async function () {
        await this.resolveFields()
        // eslint-disable-next-line prefer-const
        let [index = 0, title, url = null] = this.fields.split(true) as [number, string, string]
        index = Number(index);
        if (!this.meta?.ctn?.data?.embeds?.[index]) this.meta.ctn.addEmbed({ title })
        else (this.meta?.ctn?.data?.embeds?.[index] as EmbedBuilder).setTitle(title).setURL(url)
        return this.makeReturn("")
    }
}
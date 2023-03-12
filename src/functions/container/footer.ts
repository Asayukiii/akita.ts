import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { EmbedBuilder } from "discord.js";
import { That } from "src/classes/data";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("setFooter")
        .setValue("description", "sets the footer of this embed")
        .setValue("use", "$setFooter[index;text;iconURL?]")
        .setValue("fields", [{
            name: "index",
            description: "the index of the embed",
            type: "number[0,4]"
        }, {
            name: "text",
            description: "the text of the embed footer",
            type: "string"
        }, {
            name: "iconURL",
            description: "the icon of the embed footer",
            type: "string<URL>",
            optional: false
        }])
        .setValue("example", "$setFooter[0;$author[tag];$author[displayAvatarURL]]")
        .setValue("returns", "Void"),
    code: async function (this: That) {
        await this.resolveFields()
        let [index = 0, text, iconURL] = this.fields.split(true) as [number, string, string]
        index = Number(index);
        if (!this.meta.ctn.data.embeds[index]) this.meta.ctn.addEmbed()
        this.meta.ctn.data.embeds[index].setFooter({ text, iconURL })
        return this.makeReturn("")
    }
};
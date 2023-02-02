import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { EmbedBuilder } from "discord.js";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('setFooter')
        .setValue('description', 'sets the footer of this embed')
        .setValue('use', '$setFooter[index;text;iconURL?]')
        .setValue('fields', [{
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
        .setValue('example', '$setFooter[0;$author[tag];$author[displayAvatarURL]]')
        .setValue('returns', 'Void'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let [index = 0, text, icon] = d.interpreter.fields(d);
        index = Number(index);
        if (!d.metadata.ctn.data.embeds[index]) d.metadata.ctn.addEmbed();
        (d.metadata.ctn.data.embeds[index] as EmbedBuilder).setFooter({
            text: text,
            iconURL: icon
        });
        return {
            code: d.code?.replace(d.func.id, "")
        };
    }
};
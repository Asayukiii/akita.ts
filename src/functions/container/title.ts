import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('setTitle')
        .setValue('description', 'sets the title of this embed')
        .setValue('use', '$setTitle[index;text;url?]')
        .setValue('fields', [{
            name: 'index',
            description: 'the index of the embed',
            type: 'number[0,4]'
        }, {
            name: 'text',
            description: 'the title of the embed',
            type: 'string'
        }, {
            name: 'url',
            description: 'the url of the embed',
            type: 'string<URL>',
            optional: true
        }])
        .setValue('example', '$setTitle[0;discord!;https://discord.com/]')
        .setValue('returns', 'Void'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let [index = 0, title, url = null] = d.interpreter.fields(d);
        index = Number(index);
        if (!d.metadata.ctn.data.embeds[index]) d.metadata.ctn.addEmbed();
        d.metadata.ctn.data.embeds[index].setTitle(title).setURL(url);
        return {
            code: d.code?.replace(d.func.id, "")
        };
    }
}
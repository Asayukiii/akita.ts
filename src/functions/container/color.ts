import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('setColor')
        .setValue('description', 'sets the color of the embed')
        .setValue('use', '$setColor[index;color]')
        .setValue('fields', [{
            name: 'index',
            description: 'the index of the embed',
            type: 'number[0,4]'
        }, {
            name: 'color',
            description: 'the color of the embed',
            type: 'string<hex | [name](https://discord.js.org/#/docs/discord.js/main/typedef/ColorResolvable)>'
        }])
        .setValue('example', '$setColor[0;Red]')
        .setValue('returns', 'Void'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let [index = 0, text] = d.interpreter.fields(d);
        index = Number(index);
        if (!d.metadata.ctn.data.embeds[index]) d.metadata.ctn.addEmbed();
        d.metadata.ctn.data.embeds[index].setColor(text);
        return {
            code: d.code?.replace(d.func.id, "")
        };
    }
}
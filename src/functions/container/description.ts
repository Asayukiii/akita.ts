import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('setDescription')
        .setValue('description', 'sets the description of this embed')
        .setValue('use', '$setDescription[text]')
        .setValue('fields', [{
            name: 'index',
            description: 'the index of the embed',
            type: 'number[0,4]'
        }, {
            name: 'text',
            description: 'the description of the embed',
            type: 'string'
        }])
        .setValue('example', '$setDescription[0;hi, i dont know what put here]')
        .setValue('returns', 'Void'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let [index = 0, text] = d.interpreter.fields(d);
        index = Number(index);
        if (!d.metadata.ctn.data.embeds[index]) d.metadata.ctn.addEmbed();
        d.metadata.ctn.data.embeds[index].setDescription(text);
        return {
            code: d.code?.replace(d.func.id, "")
        };
    }
}
import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('setImage')
        .setValue('description', 'sets the image of this embed')
        .setValue('use', '$setImage[index;url]')
        .setValue('fields', [{
            name: 'index',
            description: 'the index of the embed',
            type: 'number[0,4]'
        }, {
            name: 'url',
            description: 'the image url of the embed',
            type: 'string<URL>'
        }])
        .setValue('example', '$setImage[0;https://discord.com/]')
        .setValue('returns', 'Void'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let [index = 0, url] = d.interpreter.fields(d);
        index = Number(index);
        if (!d.metadata.ctn.data.embeds[index]) d.metadata.ctn.addEmbed();
        d.metadata.ctn.data.embeds[index].setImage(url);
        return {
            code: d.code?.replace(d.func.id, "")
        };
    }
}
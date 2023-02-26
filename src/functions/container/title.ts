import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { That } from "src/classes/data";

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
    code: async function (this: That) {
        await this.resolveFields()
        let [index = 0, title, url = null] = this.fields.split(true) as [number, string, string]
        index = Number(index);
        if (!this.meta.ctn.data.embeds[index]) this.meta.ctn.addEmbed()
        this.meta.ctn.data.embeds[index].setTitle(title).setURL(url)
        return this.makeReturn("")
    }
}
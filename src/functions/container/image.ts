import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { That } from "src/classes/data";

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
    code: async function (this: That) {
        await this.resolveFields()
        let [index = 0, url] = this.fields.split(true) as [number, string]
        index = Number(index);
        if (!this.meta.ctn.data.embeds[index]) this.meta.ctn.addEmbed()
        this.meta.ctn.data.embeds[index].setImage(url)
        this.makeReturn("")
    }
}
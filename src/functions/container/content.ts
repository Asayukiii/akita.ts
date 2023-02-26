import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('setContent')
        .setValue('description', 'sets the content of this instance')
        .setValue('use', '$setContent[text]')
        .setValue('fields', [{
            name: 'text',
            description: 'the content of the instance',
            type: 'string'
        }])
        .setValue('example', '$setContent[stop crying mid!!]')
        .setValue('returns', 'Void'),
    code: async function () {
        await this.resolveFields()
        this.meta.ctn.data.content = this.inside?.unescape().trim()
        return this.makeReturn("")
    }
}
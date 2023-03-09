import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('yield')
        .setValue('description', 'make a yield')
        .setValue('use', '$yield[value]')
        .setValue('fields', [{
            name: 'value',
            type: 'any'
        }])
        .setValue('example', '$yield[hi]')
        .setValue('returns', 'Void'),
    code: async function (d: Data) {
        await this.resolveFields()
        let parent = this.meta?.parent?.id as string || "global"
        this.meta.yields[parent] = this.inside?.unescape()
        return this.makeReturn(this.meta.yields[parent])
    }
}
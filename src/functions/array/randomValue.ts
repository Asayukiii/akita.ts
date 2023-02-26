import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { random, isArray } from "lodash";
import { That } from "src/classes/data";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('randomValue')
        .setValue('description', '...')
        .setValue('use', '$randomValue[key]')
        .setValue('fields', [{
            name: 'key',
            type: 'string'
        }])
        .setValue('example', '$randomValue[anyArrayVariable] // random element of this array')
        .setValue('returns', 'Any'),
    code: async function (this: That) {
        await this.resolveFields()
        let [key] = this.fields.split(true), value = this.variable(key)
        return isArray(value)
            ? this.makeReturn(value[random(value.length)])
            : this.warn(`variable ${key.bgRed} is not an array`)
    }
}
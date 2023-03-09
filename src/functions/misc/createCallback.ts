import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('createCallback')
        .setValue('description', '...')
        .setValue('use', '$createCallback[name;code]')
        .setValue('fields', [{
            name: 'name',
            type: 'string'
        }, {
            name: 'code',
            type: 'string<interpretableCode>'
        }])
        .setValue('example', '$createCallback[test;$log[TEST;hi $1!!]]')
        .setValue('returns', 'T<name>'),
    code: async function () {
        await this.resolveFields()
        await this.fields.unsolve()
        const [name, code] = this.fields.split(true)
        this.data.client.addCallback(name, code)
        return this.makeReturn(name)
    }
}
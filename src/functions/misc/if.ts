import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('if')
        .setValue('description', 'execute a code if the given condition is truthy')
        .setValue('use', '$if[condition;truthy;falsy?]')
        .setValue('fields', [{
            name: 'condition',
            type: 'string<interpretableCode>'
        }, {
            name: 'truthy',
            type: 'string<interpretableCode>'
        }, {
            name: 'false',
            type: 'string<interpretableCode>',
            optional: true
        }])
        .setValue('example', '$if[$author[username]==Pavez;Hi best developer;Hi... shitty person]')
        .setValue('returns', 'Unknown'),
    code: async function (d: Data) {
        await this.resolveFields(0)
        const condition = this.fields.shift() as string
        await this.fields.unsolve()
        let code = this.fields.get(Utils.condition(condition) ? 0 : 1, "").trim()
        let result = await this.data.interpreter.parse(code, this.data, this.data.client)
        this.meta.break = Boolean(result?.break)
        this.meta = result?.metadata || this.meta.metadata
        return this.makeReturn(this.meta.yields[this.id])
    }
}
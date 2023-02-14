import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { That } from "src/classes/data";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('unescape')
        .setValue('description', '...')
        .setValue('use', '$unescape[code]')
        .setValue('fields', [{
            name: 'code',
            type: 'string<interpretableCode>'
        }])
        .setValue('example', 'None')
        .setValue('returns', 'Unknown'),
    code: async function (this: That): Promise<{ code: any; }> {
        await this.resolveFields()
        return this.makeReturn(this.inside?.unescape())
    }
}
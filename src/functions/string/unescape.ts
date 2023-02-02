import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";

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
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        return {
            code: d.code?.replace(d.func.id, d.func.inside?.unescape()!)
        };
    }
}
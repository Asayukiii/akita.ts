import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('escape')
        .setValue('description', '...')
        .setValue('use', '$escape[code]')
        .setValue('fields', [{
            name: 'code',
            type: 'string<interpretableCode>'
        }])
        .setValue('example', '$escape[$var[some;im will not execute]]')
        .setValue('returns', 'Unknown'),
    code: async (d: Data) => {
        await d.interpreter._(d.func);
        return {
            code: d.code?.replace(d.func.id, d.func.inside?.escape()!)
        };
    }
}
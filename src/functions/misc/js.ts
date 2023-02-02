import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { inspect } from "util";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('js')
        .setValue('description', 'evauate javascript code')
        .setValue('use', '$js[code]')
        .setValue('fields', [{
            name: 'code',
            type: 'string<interpretableCode>'
        }])
        .setValue('example', '$js[process.exit()] // well... dont execute this xd')
        .setValue('returns', 'Unknown'),
    code: async (d: Data) => {
        d.func.resolve_fields(d);
        return {
            code: d.code.replace(d.func.id, inspect(eval(d.interpreter.fields(d).join(";")), { depth: Infinity }))
        };
    }
};
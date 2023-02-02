import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('break')
        .setValue('description', 'break the execution')
        .setValue('use', '$break[code?]')
        .setValue('fields', [{
            name: 'code',
            type: 'string<interpretableCode>',
            optional: true
        }])
        .setValue('example', '$break')
        .setValue('returns', 'Unknown'),
    code: async (d: Data) => {
        d.func.resolve_fields(d);
        d.break = d.func.inside?.unescape() || true;
        return {
            code: d.code.replace(d.func.id, d.break || "")
        };
    }
}
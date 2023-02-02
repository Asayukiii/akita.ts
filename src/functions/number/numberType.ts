import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('numberType')
        .setValue('description', 'returns the number "type"')
        .setValue('use', '$numberType[integer]')
        .setValue('fields', [{
            name: 'integer',
            type: 'number'
        }])
        .setValue('example', '$numberType[1e-4] // Complex\n$numberType[hi] // NaN\n// 123 is considered Natural\n// 3.045 is considered Float\n// 1e+4 is considered Complex')
        .setValue('returns', '"Natural" | "Float" | "Complex" | "NaN"'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        var t = "NaN", [n] = d.interpreter.fields(d);
        if (!isNaN(Number(n)))
            t = n.includes("e") ? "Complex" : n.includes(".") ? "Float" : "Natural";
        return {
            code: d.code.replace(d.func.id, t)
        };
    }
};
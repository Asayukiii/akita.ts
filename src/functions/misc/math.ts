import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import * as math from 'math-expression-evaluator';

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('math')
        .setValue('description', '...')
        .setValue('use', '$math[expression]')
        .setValue('fields', [{
            name: 'expression',
            type: 'string<mathExpression>'
        }])
        .setValue('example', '$math[1+1] // i dont know, its very complex!')
        .setValue('returns', 'Number'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        return {
            code: d.code.replace(d.func.id, String(math.eval(d.func.inside?.unescape())))
        };
    }
};
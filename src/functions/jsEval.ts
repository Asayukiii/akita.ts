import { FunctionBuilder } from "../classes/builder";
import { SourceFunction, Data } from "../../index";
import { Utils } from "../classes/utils";
import { inspect } from "util";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('jsEval')
    .setValue('description', 'Eval a js code.'),
    code: async d => {
        let r = d.unpack(d)
        const util = Utils
        let returns = Utils.booleanify(r.splits[0])
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 2) return Utils.Warn('Invalid fields provided in:', d.func)
        let result;
        try {
            result = await eval(r.splits.slice(1).join(';'))
        } catch(e) {
            return Utils.Warn(`Unexpected error: ${e} in:`, d.func)
        }
        result = returns ? typeof result === 'object' ? inspect(result, { depth: 0 }): result?.toString() || 'undefined': ''
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, result)
        }
    }
}
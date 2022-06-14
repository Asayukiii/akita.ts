import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('condition')
    .setValue('description', 'Checks a condition.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let result = Utils.condition(r.inside)
        if(result === null) return Utils.Warn('Invalid condition provided in:', d.func)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, result.toString())
        }
    }
}
import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('if')
    .setValue('description', 'Send and break something if that condition is true.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 3) return Utils.Warn('Invalid fields provided in:', d.func)
        let [ condition, status, body ] = r.splits
        if(!Utils.isNumber(status)) return Utils.Warn('Invalid status provided in:', d.func)
        let result = Utils.condition(condition)
        if(result === null) return Utils.Warn('Invalid condition provided in:', d.func)
        if(result) {
            if(!Utils.isValidJSON(body.escape()!)) Utils.Warn('Invalid JSON provided in:', d.func)
            let json = JSON.parse(body.escape()!)
            d.res.status(parseInt(status)).json(json)
            d.break = true
        }
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
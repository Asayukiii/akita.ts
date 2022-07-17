import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('randomNumber')
    .setValue('description', 'Get a random number.')
    .setValue('use', '$randomNumber[min;max]')
    .setValue('returns', 'Number'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let [ min, max ] = r.splits
        if(!Utils.isNumber(min) || !Utils.isNumber(max)) return Utils.Warn('Invalid numbers provided in:', d.func)
        let n = Math.floor(Math.random() * Number(max) - Number(min))
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, n.toString())
        }
    }
}
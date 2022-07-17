import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('math')
    .setValue('description', 'Calculate a math operation.')
    .setValue('use', '$math[operation]')
    .setValue('returns', 'Number'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let final;
        try {
            if(r.inside.unescape()!.replace(/ /g, '').replace(/[\d.*()+-\/]/g, '')) return Utils.Warn('Invalid operation provided in:', d.func)
            final = eval(r.inside.unescape()!.replace(/ /g, ''))
        } catch {
            return Utils.Warn('Invalid operation provided in:', d.func)
        }
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, final)
        }
    }
}
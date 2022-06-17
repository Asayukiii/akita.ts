import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('split')
    .setValue('description', 'Splits a text.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 2) return Utils.Warn('Invalid fields provided in:', d.func)
        d._.splits = r.splits.slice(0, r.splits.length - 1).join(';').split(r.splits[r.splits.length - 1])
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
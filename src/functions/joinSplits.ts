import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('joinSplits')
    .setValue('description', 'Get the splits elements in a separator.')
    .setValue('use', '$joinSplits[separator]')
    .setValue('returns', 'String'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, d._.splits?.join(r.inside.unescape()).escape() || '')
        }
    }
}
import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('sortSplits')
    .setValue('description', 'Sorts an splitted text alphabetically.')
    .setValue('use', '$sortSplits[separator]')
    .setValue('returns', 'String'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let arr = d._.splits
        if (!arr) return Utils.Warn('There is not saved splits yet, use $split first. Error in:', d.func)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, d._.splits?.sort().join(r.inside.unescape()).escape() || '')
        }
    }
}
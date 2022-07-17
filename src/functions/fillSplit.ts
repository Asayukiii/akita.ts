import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('fillSplit')
    .setValue('description', 'Replace a split element with something.')
    .setValue('use', '$fillSplit[element;something?]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let [ element, smth ] = r.splits
        let arr: string[] | undefined = d._.splits
        if(!arr) return Utils.Warn('There is not saved splits yet, use $split first. Error in:', d.func)
        let i = arr.indexOf(element.unescape()!)
        if(i >= 0) {
            if(smth) arr.splice(i, 1, smth.unescape()!)
            else arr.splice(i, 1);
            d._.splits = arr
        }
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
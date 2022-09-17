import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('findSplitIndex')
    .setValue('description', 'Finds a text into a splitted text, if the text is found, returns its index, otherwise returns 0.')
    .setValue('use', '$findSplitIndex[query]')
    .setValue('returns', 'Number'),
    code: async d => {
        let r = d.unpack(d);
        if (!r.inside) return Utils.Warn('Invalid inside provided in:', d.func);
        let [query] = r.splits;
        let arr = d._.splits;
        if(!arr) return Utils.Warn('There is not saved splits yet, use $split first. Error in:', d.func);
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, arr.indexOf(query.unescape()) + 1 || '0')
        }
    }
}
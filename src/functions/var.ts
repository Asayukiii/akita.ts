import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('var')
    .setValue('description', 'Set a new local variable, to get the value you can use $get.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 2) return Utils.Warn('Invalid fields provided in:', d.func)
        let [n, v] = r.splits
        if(!d._.vars) d._.vars = {}
        d._.vars[n] = v.toString()
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
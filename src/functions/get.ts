import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('get')
    .setValue('description', 'Get a local variable value.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let v = d._.vars?.[r.inside]
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, v || 'undefined')
        }
    }
}
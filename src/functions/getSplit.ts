import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('getSplit')
    .setValue('description', 'Get an element from splits.')
    .setValue('use', '$getSplit[index]')
    .setValue('returns', 'Any'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(!Utils.isNumber(r.inside)) return Utils.Warn('Invalid index provided in:', d.func)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, d._.splits?.[Number(r.inside) - 1]?.escape() || 'undefined')
        }
    }
}
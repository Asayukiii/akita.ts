import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('getVar')
    .setValue('description', 'Get the variable value in the database.')
    .setValue('use', '$getVar[name]')
    .setValue('returns', 'Any'),
    code: async d => {
        let r = d.unpack(d)
        if(!d.interpreter.db) return Utils.Warn('No database set yet, error in:', d.func)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let v = await d.interpreter.db.get(r.inside)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, v || 'undefined')
        }
    }
}
import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('setVar')
    .setValue('description', 'Set a variable to the database.')
    .setValue('use', '$setVar[name;value]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d)
        if(!d.interpreter.db) return Utils.Warn('No database set yet, error in:', d.func)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let [ k, v ] = r.splits
        if(!k || !v) return Utils.Warn('Invalid fields provided in:', d.func)
        await d.interpreter.db.set(k.unescape(), Utils.loadObject(v.unescape()!) || v.unescape()!)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
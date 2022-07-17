import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('deleteVar')
    .setValue('description', 'Delete a variable from the database.')
    .setValue('use', '$deleteVar[key]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d)
        if(!d.interpreter.db) return Utils.Warn('No database set yet, error in:', d.func)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        await d.interpreter.db.delete(r.inside)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
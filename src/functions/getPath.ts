import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('getPath')
    .setValue('description', 'Get a path param.')
    .setValue('use', '$getPath[param]')
    .setValue('returns', 'String'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let result = d.req.params[r.inside.unescape()!]
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, result?.toString()?.escape() || 'undefined')
        }
    }
}
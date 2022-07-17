import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('env')
    .setValue('description', 'Get an enviorement variable value (You need to authorize that).')
    .setValue('use', '$env[key;authorization(true/false)]')
    .setValue('returns', 'String'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let [ k, auth ] = r.splits
        if(!Utils.booleanify(auth)) return Utils.Warn('Invalid authorization provided in:', d.func)
        let result = process.env[k]
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, result?.toString()?.escape() || 'undefined')
        }
    }
}
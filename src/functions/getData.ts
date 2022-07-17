import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('getData')
    .setValue('description', 'Get some data from the http request.')
    .setValue('use', '$getData[keys]')
    .setValue('returns', 'Any'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let key = (r.inside.toLowerCase() === '$default') ? JSON.stringify(d._.request_data, null, 2) : eval(`d._.request_data?.${r.inside}`)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, key?.toString()?.escape() || 'undefined')
        }
    }
}
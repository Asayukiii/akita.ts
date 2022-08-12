import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import _ from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('getData')
    .setValue('description', 'Get some data from the http request.')
    .setValue('use', '$getData[keys]')
    .setValue('returns', 'Any'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let res = _.get(d._.request_data || {}, r.inside.unescape()!)
        let key = (r.inside.toLowerCase() === '$default') ? JSON.stringify(d._.request_data, null, 2): d._.request_data ?  typeof res === 'object' ? JSON.stringify(res, null, 2): res : null
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, key?.toString()?.escape() || 'undefined')
        }
    }
}
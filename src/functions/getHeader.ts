import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('getHeader')
    .setValue('description', 'Get a header value.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let result = Array.isArray(d.req.headers[r.inside]) ? d.req.headers[r.inside]?.[0]: d.req.headers[r.inside]
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, result?.toString()?.escape() || 'undefined')
        }
    }
}
import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('getQuery')
    .setValue('description', 'Get a query parameter value.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let result = d.req.query[r.inside]?.toString()
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, result?.escape() || 'undefined')
        }
    }
}
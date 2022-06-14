import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('send')
    .setValue('description', 'Send something to the request.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 3) return Utils.Warn('Invalid fields provided in:', d.func)
        let [ status, type, body ] = r.splits
        if(!Utils.isNumber(status)) return Utils.Warn('Invalid status provided in:', d.func)
        if(type.toLowerCase() === 'json') {
            if(!Utils.isValidJSON(body)) return Utils.Warn('Invalid JSON provided in:', d.func)
            let json = JSON.parse(body)
            d.res.status(parseInt(status)).json(json)
        } else if(type.toLowerCase() === 'safe') {
            let b = d._.object
            d.res.status(parseInt(status)).json(b)
        }
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
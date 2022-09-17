import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('timeout')
    .setValue('description', 'Set the max timeout for this route and the JSON response.')
    .setValue('use', '$timeout[miliseconds;status;json]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let [time, status, json] = r.splits
        if(!Utils.isNumber(status) || !Utils.isNumber(time)) return Utils.Warn('Invalid number provided in:', d.func)
        if(!Utils.loadObject(json.unescape()!)) return Utils.Warn('Invalid JSON provided in:', d.func)
        d.res.setTimeout(Number(time), () => {
            return d.res.status(Number(status)).json(Utils.loadObject(json.unescape()!)!)
        })
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
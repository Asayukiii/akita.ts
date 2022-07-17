import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('sleep')
    .setValue('description', 'Sleep a code for a time (wait function).')
    .setValue('use', '$sleep[miliseconds]')
    .setValue('returns', 'Awaitable<Void>'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(!Utils.isNumber(r.inside)) return Utils.Warn('Invalid miliseconds provided in:', d.func)
        await (new Promise(res => setTimeout(res, Number(r.inside))))
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
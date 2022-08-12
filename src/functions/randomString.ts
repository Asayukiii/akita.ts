import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('randomString')
    .setValue('description', 'Generate a random string.')
    .setValue('use', '$randomNumber[length]')
    .setValue('returns', 'String'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(!Utils.isNumber(r.inside)) return Utils.Warn('Invalid number provided in:', d.func)
        let res = (new Array(Number(r.inside))).join().replace(/(.|$)/g, () => { return ((Math.random() * 36 ) | 0).toString(36)[Math.random() < .5 ? "toString": "toUpperCase"]() })
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, res)
        }
    }
}
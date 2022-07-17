import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('repeat')
    .setValue('description', 'Repeat a text X times.')
    .setValue('use', '$repeat[text;times]')
    .setValue('returns', 'String'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let [ txt, num ] = r.splits
        if(!txt || !num) return Utils.Warn('Invalid fields provided in:', d.func)
        if(!Utils.isNumber(num)) return Utils.Warn('Invalid number provided in:', d.func)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, txt.unescape()!.repeat(Number(num)).escape()!)
        }
    }
}
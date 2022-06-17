import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('replaceRegexp')
    .setValue('description', 'Replace something in the text using RegExp.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 4) return Utils.Warn('Invalid fields provided in:', d.func)
        let [ text, reg, flag, rep ] = r.splits
        if(reg.startsWith('/') && reg.endsWith('/')) reg = reg.slice(1, reg.length - 1)
        let rxp = new RegExp(reg.unescape()!, flag || 'g')
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, text.unescape()!.replace(rxp, rep.unescape()!).escape()!)
        }
    }
}
import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('replaceText')
    .setValue('description', 'Replace something in the text.')
    .setValue('use', '$replaceText[text;sample;target]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 3) return Utils.Warn('Invalid fields provided in:', d.func)
        let [ text, x, y, strict = 'yes' ] = r.splits
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, Utils.booleanify(strict) ? text.unescape()!.replaceAll(x.unescape()!, y.unescape()!).escape()!: text.unescape()!.replace(x.unescape()!, y.unescape()!).escape()!)
        }
    }
}
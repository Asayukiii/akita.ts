import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('hasText')
    .setValue('description', 'Check if this text has the provided thing.')
    .setValue('use', '$hasText[source;something]')
    .setValue('returns', 'Boolean'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let [ text, has ] = r.splits
        if(!text || !has) return Utils.Warn('Invalid fields provided in:', d.func)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, text.unescape()!.includes(has.unescape()!).toString())
        }
    }
}
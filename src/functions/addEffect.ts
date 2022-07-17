import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('addEffect')
    .setValue('description', 'Add an effect to the canvas context.')
    .setValue('use', '$addEffect[name;howmany]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(!d._.Canvas?.ctx) return Utils.Warn('Not canvas found, create one first using $createCanvas, in:', d.func)
        let [ name, read ] = r.splits
        if(!name || !read) return Utils.Warn('Invalid fields provided.', d.func)
        if(!Utils.isNumber(read)) return Utils.Warn('Invalid number provided in:', d.func)
        d._.Canvas.ctx.filter = `${name.unescape()}(${read})`
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
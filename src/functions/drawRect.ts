import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('drawRect')
    .setValue('description', 'Draws a rect in the canvas.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 4) return Utils.Warn('Invalid fields provided in:', d.func)
        let [ x, y, w, h, radius = '0'] = r.splits
        if(!Utils.isNumber(x) || !Utils.isNumber(y) || !Utils.isNumber(w) || !Utils.isNumber(h) || !Utils.isNumber(radius)) return Utils.Warn('Some numer is invalid in:', d.func)
        if(!d._.Canvas?.ctx) return Utils.Warn('Not canvas found, create one first using $createCanvas, in:', d.func)
        d._.Canvas.ctx.save()
        Utils.molde(d._.Canvas.ctx, Number(x), Number(y), Number(w), Number(h), parseInt(radius))
        d._.Canvas.ctx.clip()
        d._.Canvas.ctx.fillRect(Number(x), Number(y), Number(w), Number(h))
        d._.Canvas.ctx.restore()
        d._.Canvas.ctx.save()
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
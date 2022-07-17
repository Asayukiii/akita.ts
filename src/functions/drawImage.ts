import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import { Image } from "@napi-rs/canvas";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('drawImage')
    .setValue('description', 'Draws an image in the canvas.')
    .setValue('use', '$drawImage[id;x;y;width;height;radius?]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 5) return Utils.Warn('Invalid fields provided in:', d.func)
        let [ id, x , y, w, h, radius = '0' ] = r.splits
        let img: Image | null | undefined = d._.Images?.[id]
        if(!img) return Utils.Warn('Invalid image ID provided in:', d.func)
        if(!Utils.isNumber(x) || !Utils.isNumber(y) || !Utils.isNumber(w) || !Utils.isNumber(h) || !Utils.isNumber(radius)) return Utils.Warn('Some numer is invalid in:', d.func)
        if(!d._.Canvas?.ctx) return Utils.Warn('Not canvas found, create one first using $createCanvas, in:', d.func)
        d._.Canvas.ctx.save()
        Utils.molde(d._.Canvas.ctx, Number(x), Number(y), Number(w), Number(h), parseInt(radius))
        d._.Canvas.ctx.clip()
        d._.Canvas.ctx.drawImage(img, Number(x), Number(y), Number(w), Number(h))
        d._.Canvas.ctx.restore()
        d._.Canvas.ctx.save()
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
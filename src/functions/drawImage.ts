import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import { SKRSContext2D, Image } from "@napi-rs/canvas";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('drawImage')
    .setValue('description', 'Draws an image in the canvas.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 5) return Utils.Warn('Invalid fields provided in:', d.func)
        let [ id, x , y, w, h ] = r.splits
        let img: Image | null | undefined = d._.Images?.[id]
        if(!img) return Utils.Warn('Invalid image ID provided in:', d.func)
        if(!Utils.isNumber(x) || !Utils.isNumber(y) || !Utils.isNumber(w) || !Utils.isNumber(h)) return Utils.Warn('Some numer is invalid in:', d.func)
        if(!d._.Canvas?.ctx) return Utils.Warn('Not canvas found, create one first using $createCanvas, in:', d.func)
        d._.Canvas.ctx.drawImage(img, Number(x), Number(y), Number(w), Number(h))
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
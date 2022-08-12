import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { getTextHeight, Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('measureText')
    .setValue('description', 'Get metrics from a text (width | height).')
    .setValue('use', '$measureText[text;type(width/height/object)]')
    .setValue('returns', 'Number | Object'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(!d._.Canvas?.ctx) return Utils.Warn('Not canvas found, create one first using $createCanvas, in:', d.func)
        let [ text, type ] = r.splits
        if(!["width", "height", "object"].some(t => t === type.toLowerCase())) return Utils.Warn('Invalid type provided in:', d.func)
        let obj = {
            width: (d._.Canvas.ctx.measureText(text.unescape()!)).width,
            height: getTextHeight(d._.Canvas.ctx, text.unescape()!, d._.Canvas.ctx.font)
        }
        let result = type.toLowerCase() === 'object' ? JSON.stringify(obj): type.toLowerCase() === 'width' ? obj.width: obj.height.toString()
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, result)
        }
    }
}
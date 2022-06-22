import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('font')
    .setValue('description', 'Set the canvas context text font.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(!d._.Canvas?.ctx) return Utils.Warn('Not canvas found, create one first using $createCanvas, in:', d.func)
        let [ size, family ] = r.splits
        if(!Utils.isNumber(size)) return Utils.Warn('Invalid number size provided in:', d.func)
        d._.Canvas.ctx.font = `${size}px ${family}`
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('color')
    .setValue('description', 'Set the canvas context fill style color.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(!Utils.isValidHex(r.inside)) return Utils.Warn('Invalid color provided in:', d.func)
        if(!d._.Canvas?.ctx) return Utils.Warn('Not canvas found, create one first using $createCanvas, in:', d.func)
        d._.Canvas.ctx.fillStyle = '#' + r.inside.replace('#', '')
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
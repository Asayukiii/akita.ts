import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

function ResolvePer(num: number): number {
    return num / 100
}

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('opacity')
    .setValue('description', 'Set the canvas context opacity.')
    .setValue('use', '$opacity[number]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(!Utils.isNumber(r.inside)) return Utils.Warn('Invalid number provided in:', d.func)
        if(!d._.Canvas?.ctx) return Utils.Warn('Not canvas found, create one first using $createCanvas, in:', d.func)
        let n = Number(r.inside)
        if(n > 100 || 0 > n) return Utils.Warn('Invalid opacity provided in:', d.func)
        d._.Canvas.ctx.globalAlpha = ResolvePer(n)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
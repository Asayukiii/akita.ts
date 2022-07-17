import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('removeEffect')
    .setValue('description', 'Remove the current effect from the canvas context.')
    .setValue('use', '$removeEffect')
    .setValue('returns', 'Void'),
    code: async d => {
        if(!d._.Canvas?.ctx) return Utils.Warn('Not canvas found, create one first using $createCanvas, in:', d.func)
        d._.Canvas.ctx.filter = 'none'
        return {
            code: d.code.resolve(`${d.func}`, '')
        }
    }
}
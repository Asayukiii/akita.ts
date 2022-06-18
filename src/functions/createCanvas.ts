import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import Canvas from "@napi-rs/canvas";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('createCanvas')
    .setValue('description', 'Create a new canvas.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 2) return Utils.Warn('Invalid fields provided in:', d.func)
        if(!Utils.isNumber(r.splits[0]) || !Utils.isNumber(r.splits[1])) return Utils.Warn('Invalid width and height provided in:', d.func)
        let canvas = Canvas.createCanvas(Number(r.splits[0]), Number(r.splits[1]))
        let ctx = canvas.getContext('2d')
        d._.Canvas = { canvas, ctx }
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
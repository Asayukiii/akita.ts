import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('slice')
    .setValue('description', 'Get a part of a text, from X to Y..'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let [ text, x, y ] = r.splits
        if(!Utils.isNumber(x) || y && !Utils.isNumber(y)) return Utils.Warn('Invalid arguments provided in:', d.func)
        let result = text.unescape()!.slice(Number(x) - 1, y ? Number(y): undefined)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, result?.escape() || '')
        }
    }
}
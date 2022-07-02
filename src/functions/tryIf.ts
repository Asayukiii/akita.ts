import { FunctionBuilder } from "../classes/builder";
import { Interpreter, SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('tryIf')
    .setValue('description', 'Try a code if a condition is true (this is an advanced $if).'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let [ condition, code ] = [ r.splits[0], r.splits.slice(1).join(';') ]
        let result = Utils.condition(condition)
        if(result === null) return Utils.Warn('Invalid condition provided in:', d.func)
        if(result) {
            code = code.replace(/@[a-zA-Z.]{1,35}\(/gim, x => x.replace('(', '[')).replace(/@[a-zA-Z.]{1,35}/gim, x => x.replace('@', '$')).replaceAll(')', ']')
            const interpreter: Interpreter = d.interpreter
            let data = await interpreter.parse(code, d.req, d.res).catch((e: any) => {
                d.interpreter.emit('error', e)
            })
            if(data?.break) d.break = true
            if(data?._?.vars) d._.vars = Object.assign(d._.vars || {}, data?._.vars)
        }
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
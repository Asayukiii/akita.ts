import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('ternary')
    .setValue('description', 'Returns something depending a result condition, anything if true and anything if false.')
    .setValue('use', '$ternary[condition;ifTrue;ifFalse]')
    .setValue('returns', 'Any'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 3) return Utils.Warn('Invalid fields provided in:', d.func)
        let [ condition, iftrue, iffalse ] = r.splits
        let result = Utils.condition(condition)
        if(result === null) return Utils.Warn('Invalid condition provided in', d.func)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, result ? iftrue: iffalse)
        }
    }
}
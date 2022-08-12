import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import ms from "ms";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('parseTime')
    .setValue('description', 'Parse the provided time, if type is number it will return string.')
    .setValue('use', '$parseTime[miliseconds/string;long(true/false)?]')
    .setValue('returns', 'String'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let [ time, long = 'true' ] = r.splits
        let result = Utils.isNumber(r.inside) ? ms(Number(r.inside), { long: Utils.booleanify(long) }): ms(r.inside)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, result?.toString() || 'undefined')
        }
    }
}
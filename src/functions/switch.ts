import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('switch')
    .setValue('description', 'Switch between undefined choices.')
    .setValue('use', '$switch[...choices]')
    .setValue('returns', 'String'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let fields = r.splits
        let result = fields.find(i => !!i && i.trim() !== 'undefined')
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, result?.toString() || 'undefined')
        }
    }
}
import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import { join } from "path";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('root')
    .setValue('description', 'Join your files name to the process cwd.')
    .setValue('use', '$root[...files]')
    .setValue('returns', 'String'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid splits provided in:', d.func)
        let result = join(process.cwd(), ...r.splits)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, result)
        }
    }
}
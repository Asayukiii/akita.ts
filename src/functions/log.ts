import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('log')
    .setValue('description', 'Log something in console.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        console.log(r.inside.unescape())
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
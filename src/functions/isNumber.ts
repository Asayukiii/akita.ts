import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('isNumber')
    .setValue('description', 'Check if this is a valid number.')
    .setValue('use', '$isNumber[text]')
    .setValue('returns', 'Boolean'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, Utils.isNumber(r.inside).toString())
        }
    }
}
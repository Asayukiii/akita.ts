import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('random')
    .setValue('description', 'Get a random element from provided fields.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.splits.length) return Utils.Warn('Invalid fields provided in:', d.func)
        let random = Math.floor(Math.random() * r.splits.length)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, r.splits[random].escape()!)
        }
    }
}
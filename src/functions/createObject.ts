import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('createObject')
    .setValue('description', 'Create an original object.')
    .setValue('use', '$createObject[object?]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d)
        let obj = r.inside ? Utils.loadObject(r.inside.unescape()!): null
        if(r.inside && !obj) return Utils.Warn('Invalid object provided in:', d.func)
        d._.object = obj || {}
        return {
            code: d.code.resolve(`${d.func}`, '')
        }
    }
}
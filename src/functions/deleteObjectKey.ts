import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('deleteObjectKey')
    .setValue('description', 'Delete a property from the object.')
    .setValue('use', '$deleteObjectKey[key]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d)
        let obj = d._.object
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(!obj) return Utils.Warn('No object created found. Use $createObject first. Error at:', d.func)
        delete obj[r.inside]
        d._.object = obj
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
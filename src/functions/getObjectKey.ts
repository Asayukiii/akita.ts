import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('getObjectKey')
    .setValue('description', 'Get a key value from the object.')
    .setValue('use', '$getObjectKey[key]')
    .setValue('returns', 'Any'),
    code: async d => {
        let r = d.unpack(d)
        let obj = d._.object
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(!obj) return Utils.Warn('No object created found. Use $createObject first. Error at:', d.func)
        let result = obj[r.inside]?.toString()
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, result || 'undefined')
        }
    }
}
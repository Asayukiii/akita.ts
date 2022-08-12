import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import _ from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('setObjectKey')
    .setValue('description', 'Set a value to a property in the object.')
    .setValue('use', '$setObjectKey[name;value]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d)
        let obj = d._.object
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 2) return Utils.Warn('Invalid fields provided in:', d.func)
        if(!obj) return Utils.Warn('No object created found. Use $createObject first. Error at:', d.func)
        _.set(obj, r.splits[0].unescape()!, Utils.loadObject(r.splits[1].unescape()!) || r.splits[1].unescape()!)
        d._.object = obj
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
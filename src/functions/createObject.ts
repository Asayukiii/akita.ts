import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('createObject')
    .setValue('description', 'Create an original object.'),
    code: async d => {
        let r = d.unpack(d)
        let obj: Record<string, any> = {}
        if(r.inside) {
            if(!Utils.isValidJSON(r.inside)) return Utils.Warn('Invalid JSON provided in:', d.func)
            obj = JSON.parse(r.inside)
        }
        d._.object = obj
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
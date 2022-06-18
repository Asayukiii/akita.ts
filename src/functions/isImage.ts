import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('isImage')
    .setValue('description', 'Check if an image was loaded.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let v = d._.Images?.[r.inside]
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, v?.src ? 'true': 'false')
        }
    }
}
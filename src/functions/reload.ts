import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('reload')
    .setValue('description', 'Reload the API routes.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 2) return Utils.Warn('Invalid fields provided in:', d.func)
        d.routes.load(r.inside)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
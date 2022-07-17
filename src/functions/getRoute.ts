import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('getRoute')
    .setValue('description', 'Get a route property.')
    .setValue('use', '$getRoute[path;keys]')
    .setValue('returns', 'Any'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let [ name, key ] = r.splits
        if(!name || !key) return Utils.Warn('Invalid parameters provided in:', d.func)
        let result = d.routes.getRoutes().find(r => r.path.toLowerCase() == name)
        let k = eval(`result?.${key}`)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, k?.escape() || 'undefined')
        }
    }
}
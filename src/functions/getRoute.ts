import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import _ from "lodash";

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
        let result: any = d.routes.getRoutes().find(r => r.path.toLowerCase() == name)
        result = r.inside.unescape()?.toLowerCase()! === '$default' ? result: _.get(result, r.inside.unescape()!)
        result = r.inside.unescape()?.toLowerCase()! === '$default' ? JSON.stringify(result, null, 2): typeof result !== 'object' ? result: JSON.stringify(result, null, 2)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, result?.escape() || 'undefined')
        }
    }
}
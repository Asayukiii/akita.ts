import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('encodeURI')
    .setValue('description', 'Encode a text to URI component.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, encodeURIComponent(r.inside.unescape()!)?.escape() || 'undefined')
        }
    }
}
import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import { GlobalFonts } from "@napi-rs/canvas";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('registerFont')
    .setValue('description', 'Register a new font to be used.')
    .setValue('use', '$registerFont[path;family]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let [ path, family ] = r.splits
        GlobalFonts.registerFromPath(path, family)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
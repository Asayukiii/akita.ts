import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('item')
        .setValue('description', 'get item')
        .setValue('use', '$item[key?]')
        .setValue('returns', 'T<Key ? Metadata.item<Key> : Metadata.item>'),
    code: async (d: Data) => {
        d.func = await d.func.resolve_fields(d);
        let r = d.func.inside ? lodash.get(d.metadata.item, d.func.inside) : d.metadata.item;
        return {
            code: d.code?.replace(d.func.id, typeof r == "string" ? r : JSON.stringify(r))
        };
    }
}
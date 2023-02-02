import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('metadata')
        .setValue('description', 'get metadata info')
        .setValue('use', '$metadata[key?]')
        .setValue('returns', 'Unknown'),
    code: async (d: Data) => {
        d.func = await d.func.resolve_fields(d);
        let r = d.func.inside ? lodash.get(d.metadata, d.interpreter.fields(d).join(".")) : d.metadata;
        return {
            code: d.code?.replace(d.func.id, typeof r == "string" ? r : JSON.stringify(r))
        };
    }
}
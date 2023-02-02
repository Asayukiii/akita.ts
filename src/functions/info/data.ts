import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('data')
        .setValue('description', 'get interpreter data')
        .setValue('use', '$data[key?]')
        .setValue('fields', [{
            name: 'key',
            type: 'string',
            optional: true
        }])
        .setValue('example', '$data[metadata;vars]')
        .setValue('returns', 'Unknown'),
    code: async (d: Data) => {
        d.func = await d.func.resolve_fields(d);
        let r = d.func.inside ? lodash.get(d, d.interpreter.fields(d)) : d;
        return {
            code: d.code?.replace(d.func.id, typeof r == "string" ? r : JSON.stringify(r))
        };
    }
}
import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('jsonParse')
        .setValue('description', '...')
        .setValue('use', '$jsonParse[value]')
        .setValue('fields', [{
            name: 'value',
            type: 'object<JSONEncodable | HJSONEncodable>'
        }])
        .setValue('example', 'None')
        .setValue('returns', 'Any'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let [value] = d.interpreter.fields(d);
        return {
            code: d.code?.replace(d.func.id, JSON.stringify(Utils.Object(value)))
        };
    }
}
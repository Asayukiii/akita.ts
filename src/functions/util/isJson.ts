import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import Hjson from "hjson";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('isJSON')
        .setValue('description', 'checks is a valid JSON')
        .setValue('use', '$isJSON[object;hjson?]')
        .setValue('fields', [{
            name: 'object',
            type: 'object<T<hjson> ? HJSONEncodable : JSONEncodable>'
        }, {
            name: 'hjson',
            type: 'boolean',
            optional: true
        }])
        .setValue('example', 'None')
        .setValue('returns', 'Unknown'),
    code: async (d: Data) => {
        d.func.resolve_fields(d);
        let [ object, hjson = "true" ] = d.interpreter.fields(d);
        try {
            Utils.booleanify(hjson) ? Hjson.parse(object) : JSON.parse(object);
            return {
                code: d.code.replace(d.func.id, "true")
            };
        } catch (error) {
            return {
                code: d.code.replace(d.func.id, "false")
            };
        }
    }
}
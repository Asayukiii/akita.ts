import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { Utils } from "../../classes/utils";
import Hjson from "hjson";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('isJSON')
        .setValue('description', 'checks is a valid JSON')
        .setValue('use', '$isJSON[object;hjson?]')
        .setValue('fields', [{
            name: 'object',
            description: 'the object to validate',
            type: 'HJSONEncodable | JSONEncodable'
        }, {
            name: 'hjson',
            description: 'whether or not to use HJson',
            type: 'boolean',
            optional: true
        }])
        .setValue('example', 'None')
        .setValue('returns', 'Unknown'),
    code: async function () {
        await this.resolveFields()
        let [object, hjson = "true"] = this.fields.split(true) as string[]
        try {
            Utils.booleanify(hjson) ? Hjson.parse(object) : JSON.parse(object);
            return this.makeReturn("true")
        } catch {
            return this.makeReturn("false")
        }
    }
}
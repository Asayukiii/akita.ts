import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('isValidHex')
        .setValue('description', 'check if the provided value is a valid hex code')
        .setValue('use', '$isValidHex[resolvable]')
        .setValue('fields', [{
            name: 'resolvable',
            type: 'string'
        }])
        .setValue('example', '$isValidHex[#124f09] // true')
        .setValue('returns', 'Boolean'),
    code: async (d: Data) => {
        d.func = await d.func.resolve_fields(d);
        let [hex] = d.interpreter.fields(d);
        return {
            code: d.code?.replace(d.func.id, Utils.ValidateHex(hex))
        };
    }
}
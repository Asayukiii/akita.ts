import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { random, get, isArray } from "lodash";
import { Utils } from "../../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('randomNumber')
        .setValue('description', '...')
        .setValue('use', '$random[key]')
        .setValue('fields', [{
            name: 'key',
            type: 'string'
        }])
        .setValue('example', '$randomValue[anyArrayVariable] // random element of this array')
        .setValue('returns', 'Any'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let key = d.interpreter.fields(d).join(";"),
            value = get(d.metadata.vars, key);
        if (!isArray(value)) return Utils.Warn(`variable ${key.bgRed} is not an array`, d, true);
        return {
            code: d.code?.replace(d.func.id, value[random(value.length)])
        };
    }
}
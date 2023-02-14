import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
// import { Utils } from "../../classes/utils";
import { random } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('randomNumber')
        .setValue('description', '...')
        .setValue('use', '$random[...choices]')
        .setValue('fields', [{
            name: 'min',
            type: 'number'
        }])
        .setValue('example', '$random[a;b;c;d] // random value')
        .setValue('returns', 'Any'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let choices = d.interpreter.fields(d);
        return {
            code: d.code?.replace(d.func.id, choices[random(choices.length)])
        };
    }
}
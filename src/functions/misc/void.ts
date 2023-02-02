import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
// import { Utils } from "../../classes/utils";
// import lodash from "lodash";
// import Hjson from "hjson";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('void')
        .setValue('description', 'make a void return')
        .setValue('use', '$void[sentence]')
        .setValue('fields', [{
            name: 'sentence',
            type: 'string<interpretableCode>'
        }])
        .setValue('example', '$void[$var[hi;asdf]] // creates the variable hi, but does not return its value')
        .setValue('returns', 'Void'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        return {
            code: d.code?.replace(d.func.id, "")
        };
    }
}
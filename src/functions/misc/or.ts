import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
// import lodash from "lodash";
// import Hjson from "hjson";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('or')
        .setValue('description', 'returns the first truthy value')
        .setValue('use', '$or[...args]')
        .setValue('fields', [{
            name: 'args',
            type: 'any'
        }])
        .setValue('example', '$or[0;false;hi;undefined] // hi\n$or[0;false;undefined] // no return')
        .setValue('returns', 'Any'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        return {
            code: d.code?.replace(d.func.id, d.interpreter.fields(d).find((a) => !Utils.falsys.includes(a)) || "")
        };
    }
}
import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
// import { Utils } from "../../classes/utils";
// import lodash from "lodash";
// import Hjson from "hjson";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('yield')
        .setValue('description', 'make a yield')
        .setValue('use', '$yield[value]')
        .setValue('fields', [{
            name: 'value',
            type: 'any'
        }])
        .setValue('example', '$yield[hi]')
        .setValue('returns', 'Void'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let p = d.metadata?.parent?.id as string || "global";
        d.metadata.yields[p] = d.func.inside?.unescape();
        return {
            code: d.code?.replace(d.func.id, d.metadata.yields[p])
        };
    }
}
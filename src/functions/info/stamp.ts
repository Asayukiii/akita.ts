import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
// import { Utils } from "../../classes/utils";
// import lodash from "lodash";
// import Hjson from "hjson";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('stamp')
        .setValue('description', 'return the actual datestamp')
        .setValue('use', '$stamp')
        .setValue('example', '$stamp')
        .setValue('returns', 'Number'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        return {
            code: d.code?.replace(d.func.id, Date.now().toString())
        };
    }
}
import { FunctionBuilder } from "../../classes/builder";
import { Utils } from "../../classes/utils";
import { SourceFunction, Data } from "../../../index";
import { inspect } from "util";
import lodash from "lodash";
import Hjson from "hjson";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("last")
        .setValue("description", "gets the last element of array")
        .setValue("use", "$last[key]")
        .setValue("fields", [{
            name: "key",
            description: "the key of array or string",
            type: "string<variable>",
        }])
        .setValue("example", "$var[str;hi, im a string] // string var\n$var[arr;[3,5,2,7,2]] // array var\n$last[str] // g\n$last[arr] // 2")
        .setValue("returns", "String"),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        const [key] = d.interpreter.fields(d), v = lodash.last(lodash.get(d.metadata.vars, key, "undefined"));
        return {
            code: d.code?.replace(d.func.id, typeof v == "string" ? v : inspect(v, { depth: Infinity }))
        };
    }
}
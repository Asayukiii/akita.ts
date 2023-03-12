import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";
import Hjson from "hjson";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("push")
        .setValue("description", "adds elements to the end of an array and returns the new length (this mutates the array")
        .setValue("use", "$push[key;...items]")
        .setValue("fields", [{
            name: "key",
            description: "the key of array",
            type: "string<variable>"
        }, {
            name: "...items",
            description: "the elements to add",
            type: "any"
        }])
        .setValue("example", "$var[array;[1, 2, 3]]\n$push[array;5;string:6]\n$log[;$var[array]] // [1, 2, 3, 4, 5, \"6\"]")
        .setValue("returns", "number"),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let [key, ...items] = d.interpreter.fields(d) as [string, ...any],
            value = lodash.get(d.metadata.vars, key);
        if (!lodash.isArray(value)) return Utils.Warn(`variable ${key.bgRed} is not an array`, d, true);
        items = Utils.Types(d, items);
        lodash.set(d.metadata.vars, key, (value.push(...items), value));
        return {
            code: d.code?.replace(d.func.id, value.length.toString())
        };
    }
}
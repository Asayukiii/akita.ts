import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { That } from "src/classes/data";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("flat")
        .setValue("description", "mutate the array with all sub-array elements concatenated into it recursively up to the specified depth")
        .setValue("use", "$flat[key;limit?]")
        .setValue("fields", [{
            name: "key",
            description: "the key of the array to join or a json array",
            type: "string<variable>",
        }, {
            name: "separator",
            description: "the depth level specifying how deep a nested array structure should be flattened `(default: Infinity)`",
            type: "string",
            optional: true
        }])
        .setValue("example", "$var[array;[\n\t\"my\", \"best\", [\n\t\t\"friend's\", [\n\t\t\t\"a\", \"butcher\"\n\t\t]\n\t]\n]]\n$flat[array] // [\"my\", \"best\", \"friend's\", \"a\", \"butcher\"]\n$join[array] // my best friend's a butcher")
        .setValue("returns", "Any[]"),
    code: async function (this: That) {
        await this.resolveFields()
        const [key, depth = Infinity] = this.fields.split(true),
            value = this.variable(key)
        return Array.isArray(value) ? (
            this.setVariable(key, value.flat(Number(depth))),
            this.makeReturn(value)
        ) : this.warn("invalid array provided")
        // await d.func.resolve_fields(d);
        // let [k, depth = Infinity] = d.interpreter.fields(d),
        //     value = lodash.get(d.metadata.vars, k, undefined);
        // return lodash.isArray(value)
        //     ? (
        //         lodash.set(d.metadata.vars, k, value.flat(Number(depth))),
        //         { code: d.code.replace(d.func.id, JSON.stringify(lodash.get(d.metadata.vars, k, [])) || "") }
        //     ) : Utils.Warn("Invalid Array Provided", d, true);
    }
}
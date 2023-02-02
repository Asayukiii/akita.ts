import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('increment')
        .setValue('description', 'increments a numeric variable by 1')
        .setValue('use', '$increment[key;type?]')
        .setValue('fields', [{
            name: 'key',
            type: 'string<variable>',
        }, {
            name: "type",
            type: '"prefix" | "postfix"',
            optional: true
        }])
        .setValue('example', '$var[index;4] $var[xedni;8]\n$increment[index] // increments and return 5\n$increment[xedni;postfix] // increments and return 8')
        .setValue('returns', 'Number'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let [key, from = "prefix"] = d.interpreter.fields(d) as [string, "prefix" | "postfix"],
            value = lodash.get(d.metadata.vars, key);
        if (!["bigint", "number"].includes(typeof value)) return Utils.Warn(`variable ${key.bgYellow} is not numeric`, d);
        if (!["prefix", "postfix"].includes(from)) return Utils.Warn(`invalid type`, d);
        lodash.set(d.metadata.vars, key, ++value);
        return {
            code: d.code?.replace(d.func.id, lodash.toLower(from) == "prefix" ? value : --value)
        };
    }
}
import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash, { isArray } from "lodash";
import { That } from "src/classes/data";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("join")
        .setValue("description", "unify the values of an array in a string")
        .setValue("use", "$join[key;separator?]")
        .setValue("fields", [{
            name: "key",
            description: "the key of the array to join or a json array",
            type: "string<variable> | array",
        }, {
            name: "separator",
            description: "the element separator `(default \\b)`",
            type: "string",
            optional: true
        }])
        .setValue("example", "$var[array;[\"hola!\", \"sabias\", \"que\", \"hablo\", \"español?\"]]\n$join[array; ] // hola! sabias que hablo español?")
        .setValue("returns", "String"),
    code: async function (this: That) {
        await this.resolveFields()
        const [key, separator = ", "] = this.fields.split(true) as string[],
            value = this.variable(key)
        if(isArray(value) !== true) return this.warn("invalid array provided")
        return this.makeReturn(value.join(separator))
        // await d.func.resolve_fields(d);
        // let [t, sep = " "] = d.interpreter.fields(d);
        // let value = lodash.get(d.metadata.vars, t, undefined);
        // if (!lodash.isArray(value))
        //     return Utils.Warn("Invalid Array Provided", d, true);
        // return {
        //     code: d.code.replace(d.func.id, value.join(sep) || "")
        // };
    }
}
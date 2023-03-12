import { FunctionBuilder } from "../../classes/builder";
import { get, isNumber, set, toLower } from "lodash";
import { SourceFunction } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("decrement")
        .setValue("description", "decrements a numeric variable by 1")
        .setValue("use", "$decrement[key;type?]")
        .setValue("fields", [{
            name: "key",
            type: "string<variable>",
        }, {
            name: "type",
            type: "\"prefix\" | \"postfix\"",
            optional: true
        }])
        .setValue("example", "$var[a;4] $var[b;8]\n$decrement[a] // decrements and return 3\n$increment[b;postfix] // decrements and return 8")
        .setValue("returns", "Number"),
    code: async function () {
        await this.resolveFields()
        let [key, type = "prefix"] = this.fields.split(true) as string[],
            value = await get(this.meta.vars, key)
        if (!isNumber(value)) this.warn(`variable ${key.bgYellow} is not numeric`)
        if ((type = toLower(type)) !== "prefix" && type !== "postfix") this.warn("invalid type provided")
        set(this.meta.vars, key, --value)
        return this.makeReturn(type === "prefix" ? value : value + 1)
    }
}
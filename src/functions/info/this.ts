import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { get } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("this")
        .setValue("description", "get data from the thisArg")
        .setValue("use", "$this[key?]")
        .setValue("fields", [{
            name: "key",
            type: "string",
            optional: true
        }])
        .setValue("example", "$this")
        .setValue("returns", "Unknown"),
    code: async function () {
        await this.resolveFields()
        const result = this.inside ? get(this, this.fields.split(true).join(".")) : this;
        return this.makeReturn(typeof result === "string" ? result : result?.toString ? result.toString() as string : JSON.stringify(result))
    }
}
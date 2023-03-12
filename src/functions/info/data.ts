import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { get } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("data")
        .setValue("description", "get interpreter data")
        .setValue("use", "$data[key?]")
        .setValue("fields", [{
            name: "key",
            type: "string",
            optional: true
        }])
        .setValue("example", "$data[metadata;vars]")
        .setValue("returns", "Unknown"),
    code: async function () {
        await this.resolveFields()
        const result = this.inside ? get(this.data, this.fields.split(true).join(".")) : this.data;
        return this.makeReturn(typeof result === "string" ? result : result?.toString ? result.toString() as string : JSON.stringify(result))
    }
}
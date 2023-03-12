import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction, Data } from "../../../index"
import { Utils } from "../../classes/utils"

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("or")
        .setValue("description", "returns the first truthy value")
        .setValue("use", "$or[...args]")
        .setValue("fields", [{
            name: "args",
            type: "any"
        }])
        .setValue("example", "$or[0;false;hi;undefined] // hi\n$or[0;false;undefined] // no return")
        .setValue("returns", "Any"),
    code: async function (d: Data) {
        await this.resolveFields()
        return this.makeReturn(this.fields.split(true).find(a => !Utils.falsys.includes(a)) || "")
    }
}
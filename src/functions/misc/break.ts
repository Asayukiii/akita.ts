import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("break")
        .setValue("description", "break the execution")
        .setValue("use", "$break[code?]")
        .setValue("fields", [{
            name: "code",
            type: "string<interpretableCode>",
            optional: true
        }])
        .setValue("example", "$break")
        .setValue("returns", "Unknown"),
    code: async function () {
        await this.resolveFields()
        this.breakBlock()
        return this.makeReturn(this.data.break)
    }
}
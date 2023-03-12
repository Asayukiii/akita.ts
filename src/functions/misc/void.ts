import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("void")
        .setValue("description", "make a void return")
        .setValue("use", "$void[sentence]")
        .setValue("fields", [{
            name: "sentence",
            type: "string<interpretableCode>"
        }])
        .setValue("example", "$void[$var[hi;asdf]] // creates the variable hi, but does not return its value")
        .setValue("returns", "Void"),
    code: async function () {
        await this.resolveFields()
        return this.makeReturn("")
    }
}
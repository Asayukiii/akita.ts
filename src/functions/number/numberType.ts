import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("numberType")
        .setValue("description", "returns the number \"type\"")
        .setValue("use", "$numberType[integer]")
        .setValue("fields", [{
            name: "integer",
            type: "number"
        }])
        .setValue("example", "$numberType[1e-4] // Complex\n$numberType[hi] // NaN\n// 123 is considered Natural\n// 3.045 is considered Float\n// 1e+4 is considered Complex")
        .setValue("returns", "\"Natural\" | \"Float\" | \"Complex\" | \"NaN\""),
    code: async function () {
        await this.resolveFields()
        let t = "NaN", n = this.fields.shift()
        !isNaN(Number(n)) && (t = n.includes("e") ? "Complex" : n.includes(".") ? "Float" : "Natural")
        return this.makeReturn(t)
    }
}
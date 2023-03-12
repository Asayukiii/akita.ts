import { FunctionBuilder } from "../../classes/builder"
import * as math from "math-expression-evaluator"
import { SourceFunction } from "../../../index"

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("math")
        .setValue("description", "...")
        .setValue("use", "$math[expression]")
        .setValue("fields", [{
            name: "expression",
            type: "string<mathExpression>"
        }])
        .setValue("example", "$math[1+1] // i dont know, its very complex!")
        .setValue("returns", "Number"),
    code: async function () {
        await this.resolveFields()
        return this.makeReturn(String(math.eval(this.inside?.unescape())))
    }
};
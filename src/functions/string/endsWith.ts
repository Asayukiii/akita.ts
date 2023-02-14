import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction } from "../../../index"
import { That } from "src/classes/data"
import { endsWith } from "lodash"

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("startsWith")
        .setValue("description", "checks if string ends with the given target string")
        .setValue("fields", [{
            name: "string",
            type: "string"
        }, {
            name: "target",
            type: "string"
        }, {
            name: "position",
            type: "number"
        }])
        .setValue("example", "$endsWith[hi someone;someone] // true\n//var value: hi mid\n$startsWith[var:NAME;inu] // false")
        .setValue("use", "$startsWith[string;target;position?]")
        .setValue("returns", "Boolean"),
    code: async function (this: That): Promise<void | { code: any }> {
        await this.resolveFields()
        let [string, target, position] = this.fields.split(true) as [string, string, number]
        if (string.startsWith("var:")) {
            string = string.slice(4)
            let value = this.variable(string)
            if (typeof value !== "string") return this.warn(`Variable ${string.bgYellow} is not a string`)
            return this.makeReturn(this.setVariable(string, endsWith(string, target, Number(position) || 0)))
        }
        return this.makeReturn(endsWith(string, target, Number(position) || 0))
    }
}
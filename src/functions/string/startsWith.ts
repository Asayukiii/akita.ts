import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction, Data } from "../../../index"
import { startsWith } from "lodash"
import { That } from "src/classes/data"

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("startsWith")
        .setValue("description", "checks if string starts with the given target string")
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
        .setValue("example", "$startsWith[hi someone;hi] // true\n//var value: hi mid\n$startsWith[var:NAME;hello] // false")
        .setValue("use", "$startsWith[string;target;position?]")
        .setValue("returns", "Boolean"),
    code: async function (this: That): Promise<void | { code: any }> {
        await this.resolveFields()
        let [string, target, position] = this.fields.split(true) as [string, string, number]
        if (string.startsWith("var:")) {
            string = string.slice(4)
            const value = this.variable(string)
            if (typeof value !== "string") return this.warn(`Variable ${string.bgYellow} is not a string`)
            return this.makeReturn(this.setVariable(string, startsWith(string, target, Number(position) || 0)))
        }
        return this.makeReturn(startsWith(string, target, Number(position) || 0))
    }
}
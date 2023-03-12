import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction } from "../../../index"
import { Utils } from "../../classes/utils"
import { isNil } from "lodash"

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("var")
        .setValue("description", "add or get a variable")
        .setValue("use", "$var[key;value?;type?]")
        .setValue("fields", [{
            name: "key",
            description: "property to get/set",
            type: "string",
        }, {
            name: "value",
            description: "the value to be given to the variable",
            type: "any",
        }, {
            name: "type",
            description: "the variable force type `(default: unknown)`",
            type: "\"unknown\" | \"string\" | \"number\" | \"bigint\" | \"regexp\" | \"json\"",
        }])
        .setValue("example", "$var[str;hi, im a string] // string var\n$var[num;4] // number var\n$var[obj;{ \"leif\": \"erikson\" }] // object var")
        .setValue("returns", "String"),
    code: async function () {
        await this.resolveFields()
        const fields = this.fields.split(true) as [string, unknown]
        // eslint-disable-next-line prefer-const
        let [key, value] = fields
        if (key.startsWith("invoke:")) {
            value = await Utils.Invoke(this, key, fields.slice(1) as string[], this.meta)
            return this.makeReturn(value)
        }
        isNil(value) || this.setVariable(key, Utils.Types(this.data, [value] as string[]))
        return this.makeReturn(this.variable(key))
    }
}
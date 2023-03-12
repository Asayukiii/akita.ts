import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction } from "../../../index"
import { That } from "src/classes/data"
import { inspect } from "util"
import { get } from "lodash"

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("args")
        .setValue("description", "get ContextMessageArguments data (if exists)")
        .setValue("use", "$args[key?]")
        .setValue("fields", [{
            name: "key",
            description: "property to get",
            type: "string",
            optional: true
        }])
        .setValue("example", "// my msg: !some-command hi, im sdlg and i hate mid\n$args // all args (hi, im sdlg)\n$args[n] // specific argument ($args[0] = hi,)\n$args[n..m?] // slice arguments ($args[2..4] = sdlg and i)\n$args[length] // arguments size")
        .setValue("returns", "Unknown"),
    code: async function (this: That) {
        await this.resolveFields()
        const fields = this.fields.split(true)
        if (fields[0]?.includes("..")) {
            const [from = 0, to] = fields.shift()!.split("..")
            var result = this.meta.args.slice(Number(from), to.trim() == "" ? undefined : Number(to))
            result = fields.length > 0 ? get(result, fields.join(".")) : result.join(" ")
        } else { 
            var result = fields.length > 0 ? get(this.meta.args, fields.join(".")) : this.meta.args.join(" ")
        }
        return this.makeReturn(typeof result === "string" ? result : inspect(result, { depth: Infinity }) || "")
    }
}
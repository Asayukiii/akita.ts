import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction, Data } from "../../../index"
import { Utils } from "../../classes/utils"
import lodash from "lodash"

async function Condition(d: Data, c: string, o: string) {
    const r = await d.interpreter.parse(c, d, d.client)
    lodash.merge(d, r)
    d.code = o
    return Utils.condition(r!.code)
}

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("while")
        .setValue("description", "like javascript while")
        .setValue("use", "$while[condition;code;doWhileStyle?]")
        .setValue("fields", [{
            name: "condition",
            type: "string<interpretableCode<boolean>>",
        }, {
            name: "code",
            type: "string<interpretableCode>",
        }, {
            name: "doWhileStyle",
            type: "boolean",
            optional: true
        }])
        .setValue("example", "$var[n;0]\n$var[x;0]\n$while[3>$var[n];\n\t$increment[n]\n\t$var[x;$math[$var[x]+$var[n]]]\n]")
        .setValue("returns", "Void"),
    code: async function () {
        await this.fields.unsolve()
        const [condition, code, dws = "false"] = this.fields.split(true), old_code = this.data.code;
        if (Utils.booleanify(dws)) {
            do {
                const r = await this.data.interpreter.parse(code, this.data, this.data.client)
                lodash.merge(this.data, r)
                this.data.code = old_code
            } while (await Condition(this.data, condition, old_code))
        } else {
            while (await Condition(this.data, condition, old_code)) {
                const r = await this.data.interpreter.parse(code, this.data, this.data.client)
                lodash.merge(this.data, r)
                this.data.code = old_code
            }
        }
        this.data.break = false
        return this.makeReturn(this.meta.yields[this.id] || "")
    }
}
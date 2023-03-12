import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import lodash from "lodash";

enum LR { left = 1, right }

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("each")
        .setValue("description", "like javascript forEach")
        .setValue("use", "$each[var;code;type?]")
        .setValue("fields", [{
            name: "var",
            type: "string",
        }, {
            name: "code",
            type: "string<interpretableCode>"
        }, {
            name: "type",
            type: "string<left | right>",
            optional: true
        }])
        .setValue("example", "$var[texts;[\"hi\", \"nya\", \"ily paul banks\"]]\n$each[texts;\n\t$log[EACH INFO;$var[item]]\n]")
        .setValue("returns", "Void"),
    code: async function () {
        await this.resolveFields(0)
        await this.resolveFields(2)
        let [_var, _, type = "1"] = this.fields.split(true)
        type = type.toLowerCase()
        await this.fields.unsolve()
        const code = this.fields.get(1), value = lodash.get(this.meta.vars, _var)
        if (!lodash.isArray(value)) return this.warn(`variable ${_var.bgYellow} is not an array`)
        if (!LR[type]) return this.warn(`invalid type ${type.bgWhite} ${"(valid types: left | right | 1 | 2)".bgYellow}`)
        lodash[["1", "left"].includes(type) ? "forEach" : "forEachRight"](value, async (item) => {
            this.meta.item = item;
            const r = await this.data.interpreter.parse(code, this.data, this.data.client);
            lodash.merge(this.data, r);
        })
        this.data.break = false;
        return this.makeReturn(this.meta.yields[this.id])
    }
}
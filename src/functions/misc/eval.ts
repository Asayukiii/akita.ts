import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("eval")
        .setValue("description", "evaluate code")
        .setValue("use", "$eval[code]")
        .setValue("fields", [{
            name: "code",
            description: "code to evaluate",
            type: "string<interpretableCode>"
        }])
        .setValue("example", "$eval[$yield[$args]]")
        .setValue("returns", "Unknown"),
    code: async function () {
        await this.resolveFields()
        await this.fields.unsolve()
        const old_parent = this.meta.parent, old_code = this.data.code
        this.meta.parent = this.data.func
        const result = await this.data.interpreter.parse(this.inside?.unescape().trim()!, this.data, this.data.client);
        lodash.merge(this.data, {
            ...result,
            parent: old_parent,
            code: old_code,
            func: this.data.func,
            break: false
        });
        return this.makeReturn(this.meta.yields[this.id])
    }
}
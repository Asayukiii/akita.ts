import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { That } from "src/classes/data";
import { capitalize } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("capitalize")
        .setValue("description", "converts the first character of string to upper case and the remaining to lower case")
        .setValue("use", "$capitalize[text]")
        .setValue("fields", [{
            name: "text",
            type: "string"
        }])
        .setValue("example", "$capitalize[hi HaTE MySElf] // I hate my self")
        .setValue("returns", "String"),
    code: async function (this: That): Promise<void | { code: string; }> {
        await this.resolveFields();
        if (this.inside?.startsWith("var:")) {
            this.inside = this.inside.slice(4)
            const value = this.variable(this.inside)
            if (typeof value !== "string") return this.warn(`Variable ${this.inside.bgYellow} is not a string`)
            return this.makeReturn(this.setVariable(this.inside, capitalize(value)))
        }
        return this.makeReturn(capitalize(this.inside?.unescape()))
    }
}
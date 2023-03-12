import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { snakeCase } from "lodash";
import { That } from "src/classes/data";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("snake")
        .setValue("description", "converts string to snake case")
        .setValue("use", "$snake[text]")
        .setValue("fields", [{
            name: "text",
            type: "string"
        }])
        .setValue("example", "$snake[im bored documenting] // im_bored_documenting")
        .setValue("returns", "String"),
    code: async function (this: That): Promise<void | { code: string; }> {
        await this.resolveFields();
        if (this.inside?.startsWith("var:")) {
            this.inside = this.inside.slice(4)
            const value = this.variable(this.inside)
            if (typeof value !== "string") return this.warn(`Variable ${this.inside.bgYellow} is not a string`)
            return this.makeReturn(this.setVariable(this.inside, snakeCase(value)))
        }
        return this.makeReturn(snakeCase(this.inside?.unescape()))
    }
}
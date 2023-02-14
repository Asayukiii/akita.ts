import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { That } from "src/classes/data";
import { kebabCase } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('kebab')
        .setValue('description', 'converts string to kebab case')
        .setValue('use', '$kebab[text]')
        .setValue('fields', [{
            name: 'text',
            type: 'string'
        }])
        .setValue('example', '$kebab[I LOVE KEBAB STYLE] // i-love-kebab-style')
        .setValue('returns', 'String'),
    code: async function (this: That): Promise<void | { code: string; }> {
        await this.resolveFields();
        if (this.inside?.startsWith("var:")) {
            this.inside = this.inside.slice(4)
            let value = this.variable(this.inside)
            if (typeof value !== "string") return this.warn(`Variable ${this.inside.bgYellow} is not a string`)
            return this.makeReturn(this.setVariable(this.inside, kebabCase(value)))
        }
        return this.makeReturn(kebabCase(this.inside?.unescape()))
    }
}
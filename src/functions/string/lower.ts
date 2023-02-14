import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { That } from "src/classes/data";
import { lowerCase } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('lower')
        .setValue('description', 'converts string to lower case')
        .setValue('use', '$lower[text]')
        .setValue('fields', [{
            name: 'text',
            type: 'string'
        }])
        .setValue('example', '$lower[HI] // hi\n$lower[var:NAME] // convers string value to lower case')
        .setValue('returns', 'String'),
    code: async function (this: That): Promise<void | { code: string; }> {
        await this.resolveFields();
        if (this.inside?.startsWith("var:")) {
            this.inside = this.inside.slice(4)
            let value = this.variable(this.inside)
            if (typeof value !== "string") return this.warn(`Variable ${this.inside.bgYellow} is not a string`)
            return this.makeReturn(this.setVariable(this.inside, lowerCase(value)))
        }
        return this.makeReturn(lowerCase(this.inside?.unescape()))
    }
}
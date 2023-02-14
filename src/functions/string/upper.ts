import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { That } from "../../classes/data";
import { upperCase } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('upper')
        .setValue('description', 'converts string to upper case')
        .setValue('use', '$upper[text]')
        .setValue('fields', [{
            name: 'text',
            type: 'string'
        }])
        .setValue('example', '$upper[totbl its the best] // TOTBL ITS THE BEST\n//$upper[var:NAME] for variables')
        .setValue('returns', 'String'),
    code: async function (this: That): Promise<void | { code: string; }> {
        await this.resolveFields();
        if (this.inside?.startsWith("var:")) {
            this.inside = this.inside.slice(4)
            let value = this.variable(this.inside)
            if (typeof value !== "string") return this.warn(`Variable ${this.inside.bgYellow} is not a string`)
            return this.makeReturn(this.setVariable(this.inside, upperCase(value)))
        }
        return this.makeReturn(upperCase(this.inside?.unescape()))
    }
}
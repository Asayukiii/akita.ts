import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { That } from "src/classes/data";
import { camelCase } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('camel')
        .setValue('description', 'converts string to camel case')
        .setValue('use', '$camel[text]')
        .setValue('fields', [{
            name: 'text',
            type: 'string'
        }])
        .setValue('example', '$camel[i love you carlos d] // ILoveYouCarlosD')
        .setValue('returns', 'String'),
        code: async function (this: That): Promise<void | { code: string; }> {
            await this.resolveFields();
            if (this.inside?.startsWith("var:")) {
                this.inside = this.inside.slice(4)
                let value = this.variable(this.inside)
                if (typeof value !== "string") return this.warn(`Variable ${this.inside.bgYellow} is not a string`)
                return this.makeReturn(this.setVariable(this.inside, camelCase(value)))
            }
            return this.makeReturn(camelCase(this.inside?.unescape()))
        }
}
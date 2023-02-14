import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { That } from "src/classes/data";
import { deburr } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('deburr')
        .setValue('description', 'deburrs string by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks')
        .setValue('use', '$deburr[text]')
        .setValue('fields', [{
            name: 'text',
            type: 'string'
        }])
        .setValue('example', '$deburr[Hí Máxîm] // Hi Maxim')
        .setValue('returns', 'String'),
    code: async function (this: That): Promise<void | { code: string; }> {
        await this.resolveFields();
        if (this.inside?.startsWith("var:")) {
            this.inside = this.inside.slice(4)
            let value = this.variable(this.inside)
            if (typeof value !== "string") return this.warn(`Variable ${this.inside.bgYellow} is not a string`)
            return this.makeReturn(this.setVariable(this.inside, deburr(value)))
        }
        return this.makeReturn(deburr(this.inside?.unescape()))
    }
}
import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { set, ceil, get } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('ceil')
        .setValue('description', 'lodash.ceil method')
        .setValue('use', '$ceil[integer]')
        .setValue('fields', [{
            name: 'integer',
            type: 'number'
        }])
        .setValue('example', '$ceil[1.0000002] // returns 2')
        .setValue('returns', 'Number'),
    code: async function () {
        await this.resolveFields()
        if ((this.inside = this.inside?.unescape()!).startsWith("var:")) {
            set(
                this.meta.vars,
                (this.inside = this.inside.slice(4)),
                ceil(get(this.meta.vars, this.inside))
            );
            return this.makeReturn(get(this.meta.vars, this.inside))
        }
        return this.makeReturn(ceil(Number(this.inside)))
    }
}
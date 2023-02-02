import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import lodash from "lodash";

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
    code: async (d: Data) => {
        d.func.resolve_fields(d);
        if (d.func.inside?.unescape().startsWith("var:")) {
            lodash.set(
                d.metadata.vars,
                d.func.inside.slice(4),
                lodash.ceil(lodash.get(d.metadata.vars, d.func.inside.slice(4)))
            );
            return {
                code: d.code.replace(d.func.id, lodash.get(d.metadata.vars, d.func.inside.slice(4)))
            };
        } else {
            return {
                code: d.code.replace(d.func.id, lodash.ceil(Number(d.func.inside?.unescape())).toString())
            }
        }
        
    }
};
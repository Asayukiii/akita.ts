import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('floor')
        .setValue('description', 'lodash.floor method')
        .setValue('use', '$floor[integer]')
        .setValue('fields', [{
            name: 'integer',
            type: 'number'
        }])
        .setValue('example', '$flor[1.000002] // returns 1')
        .setValue('returns', 'Number'),
    code: async (d: Data) => {
        d.func.resolve_fields(d);
        if (d.func.inside?.unescape().startsWith("var:")) {
            lodash.set(
                d.metadata.vars,
                d.func.inside.slice(4),
                lodash.floor(lodash.get(d.metadata.vars, d.func.inside.slice(4)))
            );
            return {
                code: d.code.replace(d.func.id, lodash.get(d.metadata.vars, d.func.inside.slice(4)))
            };
        } else {
            return {
                code: d.code.replace(d.func.id, lodash.floor(Number(d.func.inside?.unescape())).toString())
            }
        }
        
    }
};
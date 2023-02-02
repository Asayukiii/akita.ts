import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('round')
        .setValue('description', 'lodash.round method')
        .setValue('use', '$round[integer]')
        .setValue('fields', [{
            name: 'integer',
            type: 'number'
        }])
        .setValue('example', '$round[3.5] // returns 3')
        .setValue('returns', 'Number'),
    code: async (d: Data) => {
        d.func.resolve_fields(d);
        if (d.func.inside?.unescape().startsWith("var:")) {
            lodash.set(
                d.metadata.vars,
                d.func.inside.slice(4),
                lodash.round(lodash.get(d.metadata.vars, d.func.inside.slice(4)))
            );
            return {
                code: d.code.replace(d.func.id, lodash.get(d.metadata.vars, d.func.inside.slice(4)))
            };
        } else {
            return {
                code: d.code.replace(d.func.id, lodash.round(Number(d.func.inside?.unescape())).toString())
            }
        }
        
    }
};
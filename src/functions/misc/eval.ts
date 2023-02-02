import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('eval')
        .setValue('description', 'evaluate code')
        .setValue('use', '$eval[code]')
        .setValue('fields', [{
            name: 'code',
            description: 'code to evaluate',
            type: 'string<interpretableCode>'
        }])
        .setValue('example', '$eval[$yield[$args]]')
        .setValue('returns', 'Unknown'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        await d.interpreter._(d.func);
        let old_parent = d.metadata.parent, old_code = d.code;
        d.metadata.parent = d.func;
        let r = await d.interpreter.parse(d.func.inside?.unescape().trim()!, d, d.client);
        lodash.merge(d, { 
            ...r,
            parent: old_parent,
            code: old_code,
            func: d.func,
            break: false
        });
        return {
            code: d.code?.replace(d.func.id, d.metadata.yields[d.func.id] || "undefined")
        };
    }
}
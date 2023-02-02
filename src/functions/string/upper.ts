import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

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
    code: async (d: Data) => {
        d.func = await d.func!.resolve_fields(d);
        if (d.func.inside?.startsWith("var:")) {
            var n = d.func.inside.slice(4), value = lodash.get(d.metadata.vars, n);
            if (typeof value != "string") return Utils.Warn(`Variable ${n.bgYellow} is not a string`, d);
            lodash.set(d.metadata.vars, n, lodash.upperCase(value));
            return {
                code: d.code?.replace(d.func.id, lodash.get(d.metadata.vars, n))
            };
        };
        return {
            code: d.code?.replace(d.func.id, d.func.inside?.toLowerCase()!)
        };
    }
}
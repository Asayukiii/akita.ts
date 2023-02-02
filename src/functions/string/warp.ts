import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

function warp (a: string, b: number, c: string): string {
    return a.length > b ? a.slice(0, b) + c : a;
};

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('warp')
        .setValue('description', 'limit the size of a string if necessary')
        .setValue('use', '$warp[string;limit;ellipsis?]')
        .setValue('fields', [{
            name: 'string',
            type: 'string'
        }, {
            name: 'limit',
            type: 'number'
        }, {
            name: 'ellipsis',
            description: '`(default: ...)`',
            type: 'string'
        }])
        .setValue('example', '$warp[totbl its the best;5] // totbl...\n//$warp[var:key;...] for variables, this mutates the variable')
        .setValue('returns', 'String'),
    code: async (d: Data) => {
        d.func = await d.func!.resolve_fields(d);
        let [s, l, e = "..."] = d.interpreter.fields(d);
        if (s.startsWith("var:")) {
            s = s.slice(4);
            let value = lodash.get(d.metadata.vars, s);
            if (typeof value != "string") return Utils.Warn(`Variable ${s.bgYellow} is not a string`, d);
            lodash.set(d.metadata.vars, s, lodash.upperCase(value));
            return {
                code: d.code?.replace(d.func.id, lodash.get(d.metadata.vars, warp(s, Number(l) || 0, e)))
            };
        };
        return {
            code: d.code?.replace(d.func.id, warp(s, Number(l) || 0, e))
        };
    }
}
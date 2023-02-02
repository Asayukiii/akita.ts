import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('endsWith')
        .setValue('description', 'checks if string ends with the given target string')
        .setValue('use', '$endsWith[text;target;position?]')
        .setValue('fields', [{
            name: 'text',
            type: 'string'
        }, {
            name: 'target',
            type: 'string'
        }, {
            name: 'position',
            type: 'number',
            optional: true
        }])
        .setValue('example', '$endsWith[hi mid;mid] // true\n$var[hi;hi inu]\n$endsWith[var:hi;mid] // false')
        .setValue('returns', 'Boolean'),
    code: async (d: Data) => {
        d.func = await d.func!.resolve_fields(d);
        let [text, target, position = text.length] = d.interpreter.fields(d);
        if (text?.startsWith("var:")) {
            var n = text.slice(4), value = lodash.get(d.metadata.vars, n);
            if (typeof value != "string") return Utils.Warn(`Variable ${n.bgYellow} is not a string`, d);
            return {
                code: d.code?.replace(d.func.id, lodash.endsWith(value, target, Number(position)).toString())
            };
        };
        return {
            code: d.code?.replace(d.func.id, lodash.endsWith(text, target, Number(position)).toString())
        };
    }
}
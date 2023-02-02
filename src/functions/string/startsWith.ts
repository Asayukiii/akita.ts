import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('startsWith')
        .setValue('description', 'checks if string starts with the given target string')
        .setValue('fields', [{
            name: 'name',
            type: 'string'
        }])
        .setValue('example', '$startsWith[hi someone;hi] // true\n//var value: hi mid\n$startsWith[var:NAME;hello] // false')
        .setValue('use', '$startsWith[text;target;position?]')
        .setValue('returns', 'Boolean'),
    code: async (d: Data) => {
        d.func = await d.func!.resolve_fields(d);
        let [text, target, position = 0] = d.interpreter.fields(d);
        if (text?.startsWith("var:")) {
            var n = text.slice(4), value = lodash.get(d.metadata.vars, n);
            if (typeof value != "string") return Utils.Warn(`Variable ${n.bgYellow} is not a string`, d);
            return {
                code: d.code?.replace(d.func.id, lodash.startsWith(value, target, Number(position)).toString())
            };
        };
        return {
            code: d.code?.replace(d.func.id, lodash.startsWith(text, target, Number(position)).toString())
        };
    }
}
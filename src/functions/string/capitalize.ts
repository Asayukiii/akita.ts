import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('capitalize')
        .setValue('description', 'converts the first character of string to upper case and the remaining to lower case')
        .setValue('use', '$capitalize[text]')
        .setValue('fields', [{
            name: 'text',
            type: 'string'
        }])
        .setValue('example', '$capitalize[hi HaTE MySElf] // I hate my self')
        .setValue('returns', 'String'),
    code: async (d: Data) => {
        d.func = await d.func!.resolve_fields(d);
        if (d.func.inside?.unescape()?.startsWith("var:")) {
            var n = d.func.inside.unescape().slice(4), value = lodash.get(d.metadata.vars, n);
            if (typeof value != "string") return Utils.Warn(`Variable ${n.bgYellow} is not a string`, d);
            lodash.set(d.metadata.vars, n, lodash.capitalize(value));
            return {
                code: d.code?.replace(d.func.id, lodash.get(d.metadata.vars, n))
            };
        };
        return {
            code: d.code?.replace(d.func.id, lodash.capitalize(d.func.inside?.unescape()))
        };
    }
}
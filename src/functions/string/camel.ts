import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('camel')
        .setValue('description', 'converts string to camel case')
        .setValue('use', '$camel[text]')
        .setValue('fields', [{
            name: 'text',
            type: 'string'
        }])
        .setValue('example', '$camel[i love you carlos d] // ILoveYouCarlosD')
        .setValue('returns', 'String'),
    code: async (d: Data) => {
        d.func = await d.func!.resolve_fields(d);
        if (d.func.inside?.unescape()?.startsWith("var:")) {
            var n = d.func.inside.unescape().slice(4), value = lodash.get(d.metadata.vars, n);
            if (typeof value != "string") return Utils.Warn(`Variable ${n.bgYellow} is not a string`, d);
            lodash.set(d.metadata.vars, n, lodash.camelCase(value));
            return {
                code: d.code?.replace(d.func.id, lodash.get(d.metadata.vars, n))
            };
        };
        return {
            code: d.code?.replace(d.func.id, lodash.camelCase(d.func.inside?.unescape()))
        };
    }
}
import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('kebab')
        .setValue('description', 'converts string to kebab case')
        .setValue('use', '$kebab[text]')
        .setValue('fields', [{
            name: 'text',
            type: 'string'
        }])
        .setValue('example', '$kebab[I LOVE KEBAB STYLE] // i-love-kebab-style')
        .setValue('returns', 'String'),
    code: async (d: Data) => {
        d.func = await d.func!.resolve_fields(d);
        if (d.func.inside?.startsWith("var:")) {
            var key = d.func.inside.slice(4), value = lodash.get(d.metadata.vars, key);
            if (typeof value != "string") return Utils.Warn(`Variable ${key.bgYellow} is not a string`, d);
            lodash.set(d.metadata.vars, key, lodash.kebabCase(value));
            return {
                code: d.code?.replace(d.func.id, lodash.get(d.metadata.vars, key))
            };
        };
        return {
            code: d.code?.replace(d.func.id, lodash.kebabCase(d.func.inside?.unescape()))
        };
    }
}
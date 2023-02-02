import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('snake')
        .setValue('description', 'converts string to snake case')
        .setValue('use', '$snake[text]')
        .setValue('fields', [{
            name: 'text',
            type: 'string'
        }])
        .setValue('example', '$snake[im bored documenting] // im_bored_documenting')
        .setValue('returns', 'String'),
    code: async (d: Data) => {
        d.func = await d.func!.resolve_fields(d);
        if (d.func.inside?.startsWith("var:")) {
            var key = d.func.inside.slice(4), value = lodash.get(d.metadata.vars, key);
            if (typeof value != "string") return Utils.Warn(`Variable ${key.bgYellow} is not a string`, d);
            lodash.set(d.metadata.vars, key, lodash.snakeCase(value));
            return {
                code: d.code?.replace(d.func.id, lodash.get(d.metadata.vars, key))
            };
        };
        return {
            code: d.code?.replace(d.func.id, lodash.snakeCase(d.func.inside?.unescape()))
        };
    }
}
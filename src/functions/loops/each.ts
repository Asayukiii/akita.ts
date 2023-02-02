import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

enum LR { left = 1, right };

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('each')
        .setValue('description', 'like javascript forEach')
        .setValue('use', '$each[var;code;type?]')
        .setValue('fields', [{
            name: 'var',
            type: 'string',
        }, {
            name: 'code',
            type: 'string<interpretableCode>'
        }, {
            name: 'type',
            type: 'string<left | right>',
            optional: true
        }])
        .setValue('example', '$var[texts;["hi", "nya", "ily paul banks"]]\n$each[texts;\n\t$log[EACH INFO;$var[item]]\n]')
        .setValue('returns', 'Void'),
    code: async (d: Data) => {
        await d.func.resolve_field(d, 0);
        await d.func.resolve_field(d, 2);
        let [_var, _, type = "1"] = d.interpreter.fields(d);
        type = type.toLowerCase();
        await d.interpreter._(d.func);
        let [code] = d.interpreter.fields(d, 1),
            value = lodash.get(d.metadata.vars, _var);
        if(!lodash.isArray(value)) return Utils.Warn(`variable ${_var.bgYellow} is not an array`, d);
        if(!LR[type]) return Utils.Warn(`invalid type ${type.bgWhite} ${"(valid types: left | right | 1 | 2)".bgYellow}`, d)
        lodash[["1", "left"].includes(type.toLowerCase()) ? "forEach" : "forEachRight"](value, async (item) => {
            d.metadata.item = item;
            let r = await d.interpreter.parse(code, d, d.client);
            lodash.merge(d, r);
        });
        d.break = false;
        return {
            code: d.code?.replace(d.func.id, "")
        };
    }
}
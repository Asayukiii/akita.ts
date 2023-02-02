import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";
import { bgBlue } from "colors";

async function Condition(d: Data, c: string, o: string) {
    let r = await d.interpreter.parse(c, d, d.client);
    lodash.merge(d, r);
    d.code = o;
    return Utils.condition(r!.code);
};

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('while')
        .setValue('description', 'like javascript while')
        .setValue('use', '$while[condition;code;doWhileStyle?]')
        .setValue('fields', [{
            name: 'condition',
            type: 'string<interpretableCode<boolean>>',
        }, {
            name: 'code',
            type: 'string<interpretableCode>',
        }, {
            name: 'doWhileStyle',
            type: 'boolean',
            optional: true
        }])
        .setValue('example', '$var[n;0]\n$var[x;0]\n$while[3>n;\n\t$var[n;$math[$var[n]+1]]\n\t$var[x;$math[$var[x]+$var[n]]]\n]')
        .setValue('returns', 'Void'),
    code: async (d: Data) => {
        await d.interpreter._(d.func);
        let [condition, code, dws = "false"] = d.interpreter.fields(d), old_code = d.code;
        if (Utils.booleanify(dws)) {
            do {
                let r = await d.interpreter.parse(code, d, d.client);
                lodash.merge(d, r);
                d.code = old_code;
            } while (await Condition(d, condition, old_code));
        } else {
            while (await Condition(d, condition, old_code)) {
                let r = await d.interpreter.parse(code, d, d.client);
                lodash.merge(d, r);
                d.code = old_code;
            };
        }
        d.break = false;
        return {
            code: d.code.replace(d.func.id, d.metadata.yields[d.func.id] || "")
        };
    }
}
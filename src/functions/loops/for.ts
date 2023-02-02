import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

async function Iterator(d: Data, i: string) {
    let r = await d.interpreter.parse(i, d, d.client);
    lodash.merge(d, r);
};

async function Condition(d: Data, c: string) {
    let r = await d.interpreter.parse(c, d, d.client);
    lodash.merge(d, r);
    return Utils.condition(r!.code);
};

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('for')
        .setValue('description', 'like javascript for')
        .setValue('use', '$for[start;condition;iterator;code]')
        .setValue('fields', [{
            name: 'start',
            type: 'number',
        }, {
            name: 'condition',
            type: 'string<interpretableCode<boolean>>',
        }, {
            name: 'iterator',
            type: 'string<interpretableCode> | string<default | default2>',
        }, {
            name: 'code',
            type: 'string<interpretableCode>',
        }])
        .setValue('example', '$for[0;$var[index]<100;default;$log[;INDEX NUMBER $var[index]]]')
        .setValue('returns', 'Void'),
    code: async (d: Data) => {
        await d.func.resolve_field(d, 0);
        let [start] = d.interpreter.fields(d);
        await d.interpreter._(d.func);
        let [condition, iterator, code] = d.interpreter.fields(d, 1);
        async function checkDefault() {
            iterator == "default"
                ? d.metadata.vars.index++ : iterator == "default2"
                    ? d.metadata.vars.index-- : await Iterator(d, iterator);
        };
        for (d.metadata.vars.index = Number(start); await Condition(d, condition); checkDefault()) {
            let r = await d.interpreter.parse(code, d, d.client);
            lodash.merge(d, r);
        };
        d.break = false;
        return {
            code: d.code?.replace(d.func.id, d.metadata.yields[d.func.id] || "")
        };
    }
}
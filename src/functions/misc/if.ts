import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('if')
        .setValue('description', 'execute a code if the given condition is truthy')
        .setValue('use', '$if[condition;truthy;falsy?]')
        .setValue('fields', [{
            name: 'condition',
            type: 'string<interpretableCode>'
        }, {
            name: 'truthy',
            type: 'string<interpretableCode>'
        }, {
            name: 'false',
            type: 'string<interpretableCode>',
            optional: true
        }])
        .setValue('example', '$if[$author[username]==Pavez;Hi best developer;Hi... shitty person]')
        .setValue('returns', 'Unknown'),
    code: async (d: Data) => {
        await d.func?.resolve_field(d, 0);
        let f = d.func.fields?.shift();
        await d.interpreter._(d.func);
        let code = d.func.fields?.at(Utils.condition(f?.value!) ? 0 : 1)?.value?.trim()!;
        let result = await d.interpreter.parse(code, d, d.client);
        d.break = !!result?.break;
        d.metadata = result?.metadata || d.metadata;
        return {
            code: d.code.replace(d.func.id, result?.code || "")
        };
    }
}
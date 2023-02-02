import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('createCallback')
        .setValue('description', '...')
        .setValue('use', '$createCallback[name;code]')
        .setValue('fields', [{
            name: 'name',
            type: 'string'
        }, {
            name: 'code',
            type: 'string<interpretableCode>'
        }])
        .setValue('example', '$createCallback[test;$log[TEST;hi $1!!]]')
        .setValue('returns', 'T<name>'),
    code: async (d: Data) => {
        d.func.resolve_field(d, 0);
        await d.interpreter._(d.func);
        let [ name, code ] = d.interpreter.fields(d);
        d.client.addCallback(name, code);
        return {
            code: d.code?.replace(d.func.id, name)
        };
    }
}
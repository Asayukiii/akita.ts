import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import "colors";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('log')
        .setValue('description', 'log something in console')
        .setValue('use', '$log[title;...stuffs]')
        .setValue('fields', [{
            name: 'title',
            type: 'string',
            optional: true
        }, {
            name: '...stuffs',
            type: 'any'
        }])
        .setValue('example', '$log[;hi]')
        .setValue('returns', 'Void'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let [name, ...idk] = d.interpreter.fields(d);
        console.log((name || "INFO").bgBlue, "->".gray, ...idk.map(a => a.gray))
        return {
            code: d.code.replace(d.func?.id!, '')
        };
    }
}
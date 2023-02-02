import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('send')
        .setValue('description', 'send the instance')
        .setValue('use', '$send[returnId]')
        .setValue('fields', [{
            name: 'returnId',
            description: 'whether or not to return message Id `(default: no)`',
            type: 'boolean',
        }])
        .setValue('example', '$send[no]')
        .setValue('returns', 'returnId ? Number : Void'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let [rid = "no"] = d.interpreter.fields(d);
        let result = await d.metadata.ctn.send();
        return {
            code: d.code?.replace(d.func?.id!, Utils.booleanify(rid) ? result.id : "")
        };
    }
};
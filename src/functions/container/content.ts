import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('setContent')
        .setValue('description', 'sets the content of this instance')
        .setValue('use', '$setContent[text]')
        .setValue('fields', [{
            name: 'text',
            description: 'the content of the instance',
            type: 'string'
        }])
        .setValue('example', '$setContent[stop crying mid!!]')
        .setValue('returns', 'Void'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        d.metadata.ctn.data.content = d.interpreter.fields(d).join(";");
        return {
            code: d.code.replace(d.func.id, "")
        };
    }
}
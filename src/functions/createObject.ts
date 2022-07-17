import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('createObject')
    .setValue('description', 'Create an original object.')
    .setValue('use', '$createObject')
    .setValue('returns', 'Void'),
    code: async d => {
        let obj: Record<string, any> = {}
        d._.object = obj
        return {
            code: d.code.resolve(`${d.func}`, '')
        }
    }
}
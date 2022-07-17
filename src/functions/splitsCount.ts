import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('splitsCount')
    .setValue('description', 'Get the splits elements count.')
    .setValue('use', '$splitsCount')
    .setValue('returns', 'Number'),
    code: async d => {
        return {
            code: d.code.resolve(`${d.func}`, d._.splits?.length || '0')
        }
    }
}
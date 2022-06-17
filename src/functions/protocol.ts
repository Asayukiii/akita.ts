import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('protocol')
    .setValue('description', 'Show the API protocol.'),
    code: async d => {
        return {
            code: d.code.resolve(d.func, d.req.protocol.toString() || 'undefined')
        }
    }
}
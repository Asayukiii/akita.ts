import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('parseTime')
        .setValue('description', 'convers time to miliseconds')
        .setValue('use', '$parseTime[time]')
        .setValue('fields', [{
            name: 'time',
            type: 'string<timeResolvable>'
        }])
        .setValue('example', '$parseTime[1s1h] // 3601000')
        .setValue('returns', 'Number'),
    code: async (d: Data) => {
        d.func = await d.func.resolve_fields(d);
        return {
            code: d.code?.replace(d.func.id, Utils.TimeToMS(d.func.inside!).toString())
        };
    }
}
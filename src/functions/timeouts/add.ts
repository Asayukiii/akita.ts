import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";
// import Hjson from "hjson";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('addTimeout')
        .setValue('description', '...')
        .setValue('use', '$addTimeout[time;id;data;code]')
        .setValue('fields', [{
            name: 'time',
            type: 'time'
        }, {
            name: 'id',
            type: 'string | "random"'
        }, {
            name: 'code',
            type: 'string<interpretableCode>'
        }])
        .setValue('example', '$addTimeout[5s;asdf;$log[TIMEOUT;hi!]]')
        .setValue('returns', 'Void'),
    code: async (d: Data) => {
        await d.func.resolve_field(d, 0);
        await d.func.resolve_field(d, 1);
        await d.func.resolve_field(d, 2);
        let [time, id, data] = d.interpreter.fields(d) as [number, string, Record<string, any> | null];
        data = Utils.Object(data as any) || data;
        await d.interpreter._(d.func);
        time = Utils.TimeToMS(time as unknown as string);
        id == "random" && (id = lodash.random(Number.MAX_SAFE_INTEGER).toString());
        d.client.timeouts.add(time, id, { code: d.interpreter.fields(d, 3)[0], data });
        return {
            code: d.code?.replace(d.func.id, id)
        };
    }
}
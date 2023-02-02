import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('call')
        .setValue('description', '...')
        .setValue('use', '$callback[name;...params]')
        .setValue('fields', [{
            name: 'name',
            type: 'string',
        }, {
            name: '...params',
            type: 'T'
        }])
        .setValue('example', '// client.addCallback("test", "$log[TEST;hi $1!!]")\n$call[test;Pavez] // TEST ;; hi Pavez!!')
        .setValue('returns', 'Unknown'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let [name, ...params] = d.func.fields?.map(a => a.value.unescape()!)!;
        if (!d.client.cbs[name]) return Utils.Warn("Invalid Callback Name", d, true);
        let code = d.client.cbs[name].replace(/\$(\d+)%/g, (_, a) => params[Number(a) - 1]),
            old_d = d,
            r = await d.interpreter.parse(code.trim(), d, d.client);
        lodash.merge(d, r)
        d.code = old_d.code, d.func = old_d.func;
        return {
            code: d.code?.replace(d.func.id, r?.metadata?.yield || r?.code || "")
        };
    }
}
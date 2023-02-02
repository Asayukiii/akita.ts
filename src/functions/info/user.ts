import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('user')
        .setValue('description', 'find a user and get properties')
        .setValue('use', '$user[resolvable;properties?]')
        .setValue('fields', [{
            name: 'resolvable',
            type: 'string',
        }, {
            name: 'properties',
            type: 'string',
            optional: true
        }])
        .setValue('example', '$user[Pavez#1995;id]')
        .setValue('returns', 'Unknown'),
    code: async (d: Data) => {
        d.func = await d.func.resolve_fields(d);
        let [resolvable, ...properties] = d.interpreter.fields(d),
            user = await Utils.findUser(d, resolvable), r;
        if (!user) return { code: d.code.replace(d.func.id, "undefined") };
        if (properties[0]?.startsWith("invoke:")) r = await Utils.Invoke(d, properties.shift()!, properties, user);
        else r = lodash.get(user, properties.join(".") || "id");
        return {
            code: d.code?.replace(d.func.id, r)
        };
    }
}
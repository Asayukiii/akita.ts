import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('author')
        .setValue('description', 'get author data')
        .setValue('use', '$author[key?]')
        .setValue('fields', [{
            name: 'key',
            description: '',
            type: 'string',
            optional: true
        }])
        .setValue('example', '$author[id]\n\n// using funcs\n$author[invoke:displayAvatarURL->avatar;{ size: 2048 }]')
        .setValue('returns', 'Unknown'),
    code: async (d: Data) => {
        d.func = await d.func.resolve_fields(d);
        let fields = d.interpreter.fields(d), r: any = undefined, usr = d.metadata.ctx.getUser();
        if (!usr) return Utils.Warn("This context doesn't have author!", d, true);
        if (fields[0]?.startsWith("invoke:")) r = await Utils.Invoke(d, fields[0], fields.slice(1), usr);
        else r = fields.length ? lodash.get(usr.toJSON(), fields.join(".")) : usr.toJSON();
        return {
            code: d.code?.replace(d.func.id, r)
        };
    }
}
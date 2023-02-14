import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { Utils } from "../../classes/utils";
import { That } from "src/classes/data";
import { get } from "lodash";

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
    code: async function (this: That) {
        await this.resolveFields()
        let fields = this.fields.split(true),
            result: any = "undefined",
            user = this.meta.ctx.getUser()
        if (!user) return this.warn("This context doesn't have author!")
        if (fields[0]?.startsWith("invoke:"))
            result = await Utils.Invoke(this, fields[0], fields.slice(1), user);
        else
            result = fields.length ? get(user, fields.join(".")) : user;
        this.makeReturn(result)
    }
}
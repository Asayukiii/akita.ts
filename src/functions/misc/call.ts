import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { merge } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('call')
        .setValue('description', '...')
        .setValue('use', '$call[name;...params]')
        .setValue('fields', [{
            name: 'name',
            type: 'string',
        }, {
            name: '...params',
            type: 'T'
        }])
        .setValue('example', '// client.addCallback("test", "$log[hi $1!!]")\n$call[test;Pavez] // hi Pavez!!')
        .setValue('returns', 'Unknown'),
    code: async function () {
        await this.resolveFields()
        let [name, ...params] = this.fields.split(true) as string[]
        if (this.data.client.cbs[name]) return this.warn("Invalid Callback Name")
        let code = this.data.client.cbs[name].replace(/\$(\d+)%/g, (_: void, a: string) => params[Number(a) - 1]),
            old_d = this.data, r = await this.data.interpreter.parse(code.trim(), this.data, this.data.client)
        merge(this.data, r)
        this.data.code = old_d.code, this.data.func = old_d.func
        return this.makeReturn(this.meta.yields[this.id] || r?.code || "")
    }
}
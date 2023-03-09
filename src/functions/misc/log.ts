import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction, Data } from "../../../index"
import { invoke, has } from "lodash"
import colors from "colors"
let reg = /{(.*?)}/g

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('log')
        .setValue('description', 'log something in console')
        .setValue('use', '$log[message]')
        .setValue('fields', [{
            name: 'message',
            type: 'string',
            optional: true
        }])
        .setValue('example', '$log[{red:wuuuujuuuuuuuuuuuuuuu} {gray:chchchachchchch}]')
        .setValue('returns', 'Void'),
    code: async function () {
        await this.resolveFields()
        let msg = this.inside!.unescape(),
            cosa = Array.from(msg.matchAll(reg)).reverse()
        if (cosa.length > 0) {
            for (const [total, inside] of cosa) {
                const [key, ...txts] = inside.split(":")
                if (has(colors, key)) {
                    const txt = invoke(colors, key, txts.join(":")) + colors.reset("")
                    msg = msg.replaceLast(total, txt)
                }
            }
        }
        console.log(msg)
        return this.makeReturn("")
    }
}
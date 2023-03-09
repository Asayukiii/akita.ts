import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction, Data } from "../../../index"
import { Utils } from "../../classes/utils"

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
    code: async function (d: Data) {
        await this.resolveFields()
        this.makeReturn(Utils.TimeToMS(this.inside!).toString())
    }
}
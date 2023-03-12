import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction } from "../../../index"
import { setTimeout } from "timers/promises"
import { Utils } from "../../classes/utils"

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("sleep")
        .setValue("description", "sleep the execution")
        .setValue("use", "$sleep[time]")
        .setValue("fields", [{
            name: "min",
            type: "number"
        }, {
            name: "max",
            type: "number"
        }])
        .setValue("example", "$sleep[20s]")
        .setValue("returns", "Void"),
    code: async function () {
        await  this.resolveFields()
        const time = Utils.TimeToMS(this.fields.shift())
        await setTimeout(time)
        return this.makeReturn("")
    }
}
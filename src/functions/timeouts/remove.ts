import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("removeTimeout")
        .setValue("description", "Remove and cancel a timeout")
        .setValue("use", "$removeTimeout[time]")
        .setValue("fields", [{
            name: "id",
            type: "string"
        }])
        .setValue("example", "$removeTimeout[1223645]")
        .setValue("returns", "Void"),
    code: async function () {
        await this.resolveFields()
        let id = this.fields.shift() as string,
            coso = "false",
            timeouts = (await this.data.client.timeouts.get_timeouts()).filter(({ id: tid }) => tid === id)
        if (timeouts.length > 0) {
            for (const timeout of timeouts) {
                coso = await this.data.client.timeouts.remove(timeout).then(() => "true")
            }
        }
        return this.makeReturn(coso)
    }
}
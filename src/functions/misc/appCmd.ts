import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction, Data } from "../../../index"
import { Utils } from "../../classes/utils"

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("appCmd")
        .setValue("description", "...")
        .setValue("use", "$appCmd[method;...params?]")
        .setValue("fields", [{
            name: "method",
            type: "\"create\" | \"edit\" | \"delete\"",
        }, {
            name: "...params",
            type: "[object<applicationCommandData>, guildId?] | [applicationCommandResolvable, object<applicationCommandData>, guildId?] | [applicationCommandResolvable, object<applicationCommandData>]"
        }])
        .setValue("example", "None")
        .setValue("returns", "Unknown"),
    code: async function (d: Data) {
        await this.resolveFields()
        let [method, ...params] = this.fields.split(true) as string[], result: unknown = "undefined"
        if (method == "create") {
            try {
                var cmd: any, guild: string | undefined = undefined
                if (Number(params.at(-1))) guild = params.pop()
                cmd = Utils.Object(params.join(";"))
            } catch {
                return this.warn("Invalid JSON provided")
            }
            result = await this.data.client.application?.commands.create(cmd, guild);
        } else if (method == "edit") {
            try {
                var cmd: any, guild: string | undefined = undefined
                if (Number(params.at(-1))) guild = params.pop()
                cmd = Utils.Object(params.slice(1).join(";"))
            } catch {
                return this.warn("Invalid JSON provided")
            }
            result = await this.data.client.application?.commands.edit(params[0], cmd, guild!)
        } else if (method == "delete") {
            result = await this.data.client.application?.commands.delete(params[0], params[1])
        }
        return this.makeReturn(result)
    }
}
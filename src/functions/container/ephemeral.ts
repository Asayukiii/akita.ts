import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction } from "../../../index"
import { Utils } from "../../classes/utils"

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("ephemeral")
        .setValue("description", "make ephemeral this instance")
        .setValue("use", "$ephemeral[force?]")
        .setValue("fields", [{
            name: "force",
            description: "the forced value",
            type: "string"
        }])
        .setValue("example", "$ephemeral[true]")
        .setValue("returns", "Void"),
    code: async function () {
        await this.resolveFields();
        (this.meta.ctn.data as { ephemeral: boolean }).ephemeral = Utils.booleanify(this.fields.shift())
        return this.makeReturn("")
    }
}
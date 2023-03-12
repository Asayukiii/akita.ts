import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("addRow")
        .setValue("description", "add a ActionRow at the instance")
        .setValue("use", "$addRow")
        .setValue("example", "$addRow")
        .setValue("returns", "Void"),
    code: async function () {
        this.meta.ctn.addRow()
        await this.resolveFields()
        return this.makeReturn("")
    }
}
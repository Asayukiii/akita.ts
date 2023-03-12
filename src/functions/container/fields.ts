import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { Utils } from "../../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("setFields")
        .setValue("description", "sets the fields of the embed")
        .setValue("use", "$setFields[index;...field]")
        .setValue("fields", [{
            name: "index",
            description: "the index of the embed",
            type: "number[0,4]"
        }, {
            name: "field",
            description: "field data",
            type: "[EmbedFieldObject](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIEmbedField)"
        }])
        .setValue("example", "$setColor[0;Red]")
        .setValue("returns", "Void"),
    code: async function () {
        await this.resolveFields()
        let [index = 0, ...fields] = this.fields.split(true) as [number, ...string[]]
        index = Number(index)
        if (!this.meta.ctn.data.embeds[index]) this.meta.ctn.addEmbed()
        this.meta.ctn.data.embeds[index].setFields(fields.map(Utils.Object))
        return this.makeReturn("")
    }
}
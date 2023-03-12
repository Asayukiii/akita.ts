import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { That } from "src/classes/data";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("setDescription")
        .setValue("description", "sets the description of this embed")
        .setValue("use", "$setDescription[text]")
        .setValue("fields", [{
            name: "index",
            description: "the index of the embed",
            type: "number[0,4]"
        }, {
            name: "text",
            description: "the description of the embed",
            type: "string"
        }])
        .setValue("example", "$setDescription[0;hi, i dont know what put here]")
        .setValue("returns", "Void"),
    code: async function (this: That) {
        await this.resolveFields()
        let [index = 0, text] = this.fields.split(true) as [number, string]
        index = Number(index);
        if (!this.meta.ctn.data.embeds[index]) this.meta.ctn.addEmbed()
        this.meta.ctn.data.embeds[index].setDescription(text);
        return this.makeReturn("")
    }
}
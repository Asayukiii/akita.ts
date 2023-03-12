import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("setColor")
        .setValue("description", "sets the color of the embed")
        .setValue("use", "$setColor[index;color]")
        .setValue("fields", [{
            name: "index",
            description: "the index of the embed",
            type: "number[0,4]"
        }, {
            name: "color",
            description: "the color of the embed",
            type: "string<hex | [name](https://discord.js.org/#/docs/discord.js/main/typedef/ColorResolvable)>"
        }])
        .setValue("example", "$setColor[0;Red]")
        .setValue("returns", "Void"),
    code: async function () {
        // jaja no se que es un color
        await this.resolveFields()
        const index = Number(this.fields.shift());
        if (!this.meta.ctn.data.embeds[index]) this.meta.ctn.addEmbed()
        this.meta.ctn.data.embeds[index].setColor(this.fields.shift());
        return this.makeReturn("")
    }
}
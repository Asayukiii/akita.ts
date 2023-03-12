import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { get } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("item")
        .setValue("description", "get item")
        .setValue("use", "$item[key?]")
        .setValue("returns", "T<Key ? Metadata.item<Key> : Metadata.item>"),
    code: async function () {
        await this.resolveFields()
        return this.makeReturn(this.inside ? get(this.meta.item, this.inside) : this.meta.item)
    }
}
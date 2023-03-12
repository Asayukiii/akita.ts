import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("jsonParse")
        .setValue("description", "...")
        .setValue("use", "$jsonParse[value]")
        .setValue("fields", [{
            name: "value",
            type: "object<JSONEncodable | HJSONEncodable>"
        }])
        .setValue("example", "None")
        .setValue("returns", "Any"),
    code: async function () {
        await this.resolveFields()
        return this.makeReturn(JSON.stringify(Utils.Object(this.inside!)))
    }
}
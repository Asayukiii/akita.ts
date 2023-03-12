import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { That } from "src/classes/data";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("escape")
        .setValue("description", "...")
        .setValue("use", "$escape[code]")
        .setValue("fields", [{
            name: "code",
            type: "string<interpretableCode>"
        }])
        .setValue("example", "$escape[$var[some;im will not a normal person pls help]]")
        .setValue("returns", "Unknown"),
    code: async function (this: That): Promise<void | { code: string; }> {
        await this.resolveFields()
        return this.makeReturn(this.inside?.escape())
    }
}
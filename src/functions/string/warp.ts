import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";
import { That } from "src/classes/data";

function warp(a: string, b: number, c: string): string {
    return a.length > b ? a.slice(0, b) + c : a;
}

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("warp")
        .setValue("description", "limit the size of a string if necessary")
        .setValue("use", "$warp[string;limit;ellipsis?]")
        .setValue("fields", [{
            name: "string",
            type: "string"
        }, {
            name: "limit",
            type: "number"
        }, {
            name: "ellipsis",
            description: "`(default: ...)`",
            type: "string"
        }])
        .setValue("example", "$warp[totbl its the best;5] // totbl...\n//$warp[var:key;...] for variables, this mutates the variable")
        .setValue("returns", "String"),
    code: async function (this: That): Promise<void | { code: string; }> {
        await this.resolveFields()
        let [string, limit, ellipsis = "..."] = this.fields.split(true) as string[]
        if (string.startsWith("var:")) {
            string = string.slice(4)
            const value = this.variable(string)
            if (typeof value !== "string") return this.warn(`Variable ${string.bgYellow} is not a string`)
            return this.makeReturn(this.setVariable(string, warp(string, Number(limit) || 0, ellipsis)))
        }
        return this.makeReturn(warp(string, Number(limit) || 0, ellipsis))
    }
}
import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { floor, get, set } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("floor")
        .setValue("description", "lodash.floor method")
        .setValue("use", "$floor[integer]")
        .setValue("fields", [{
            name: "integer",
            type: "number"
        }])
        .setValue("example", "$flor[1.000002] // returns 1")
        .setValue("returns", "Number"),
    code: async function () {
        await this.resolveFields()
        if ((this.inside = this.inside?.unescape()!).startsWith("var:")) {
            set(
                this.meta.vars,
                (this.inside = this.inside.slice(4)),
                floor(get(this.meta.vars, this.inside))
            );
            return this.makeReturn(get(this.meta.vars, this.inside))
        }
        return this.makeReturn(floor(Number(this.inside)))
    }
}
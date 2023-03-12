import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { round, set, get } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("round")
        .setValue("description", "lodash.round method")
        .setValue("use", "$round[integer]")
        .setValue("fields", [{
            name: "integer",
            type: "number"
        }])
        .setValue("example", "$round[3.5] // returns 3")
        .setValue("returns", "Number"),
    code: async function () {
        await this.resolveFields()
        if ((this.inside = this.inside?.unescape()!).startsWith("var:")) {
            set(
                this.meta.vars,
                (this.inside = this.inside.slice(4)),
                round(get(this.meta.vars, this.inside))
            );
            return this.makeReturn(get(this.meta.vars, this.inside))
        }
        return this.makeReturn(round(Number(this.inside)))
    }
};
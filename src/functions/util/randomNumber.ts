import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import { random } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("randomNumber")
        .setValue("description", "Produces a random number between min and max")
        .setValue("use", "$randomNumber[min;max;decimals?]")
        .setValue("fields", [{
            name: "min",
            type: "number"
        }, {
            name: "max",
            type: "number"
        }])
        .setValue("example", "$randomNumber[0;400] // random number between 0 and 400")
        .setValue("returns", "Any"),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        const [e, s, r] = d.interpreter.fields(d);
        return {
            code: d.code?.replace(d.func.id, random(Number(e), Number(s), Utils.booleanify(r)).toString())
        };
    }
}
import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { Utils } from "../../classes/utils";
import { That } from "src/classes/data";
import { get } from "lodash";
import { inspect } from "util";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("ctx")
        .setValue("description", "get context data")
        .setValue("use", "$ctx[key?]")
        .setValue("fields", [{
            name: "key",
            type: "string",
            optional: true
        }])
        .setValue("example", "$ctx[data.guild;id]")
        .setValue("returns", "Unknown"),
    code: async function (this: That) {
        await this.resolveFields()
        let fields = this.fields.split(true) as string[], result = "undefined"
        if (fields[0].startsWith("invoke:")) result = await Utils.Invoke(this, fields.shift()!, fields, this.meta.ctx)
        else result = fields.length ? get(this.meta.ctx, fields.join(".")) : this.meta.ctx
        result ||= "undefined"
        return this.makeReturn(typeof result === "string" ? result : inspect(result, { depth: null })) 
        // d.func = await d.func.resolve_fields(d);
        // let fields = d.interpreter.fields(d), r;
        // if (fields[0].startsWith("invoke:"))
        //     r = await Utils.Invoke(d, fields[0], fields.slice(1), d.metadata.ctx);
        // else
        //     r = fields.length ? lodash.get(d.metadata.ctx, fields.join(".")) : d.metadata.ctx;
        // r ||= "undefined";
        // return {
        //     code: d.code?.replace(d.func.id, typeof r == "string" ? r : inspect(r, { depth: Infinity }))
        // };
    }
}
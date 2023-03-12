import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";

async function Iterator(d: Data, i: string) {
    const r = await d.interpreter.parse(i, d, d.client);
    lodash.merge(d, r);
}

async function Condition(d: Data, c: string) {
    const r = await d.interpreter.parse(c, d, d.client);
    lodash.merge(d, r);
    return Utils.condition(r!.code);
}

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("for")
        .setValue("description", "like javascript for")
        .setValue("use", "$for[start;condition;iterator;code]")
        .setValue("fields", [{
            name: "start",
            type: "number",
        }, {
            name: "condition",
            type: "string<interpretableCode<boolean>>",
        }, {
            name: "iterator",
            type: "string<interpretableCode> | string<default | default2>",
        }, {
            name: "code",
            type: "string<interpretableCode>",
        }])
        .setValue("example", "$for[0;$var[index]<100;default;$log[;INDEX NUMBER $var[index]]]")
        .setValue("returns", "Void"),
    code: async function () {
        await this.resolveFields(0)
        const start = this.fields.shift()
        await this.fields.unsolve()
        const [condition, iterator, code] = this.fields.split(true)
        const checkDefault = async () => {
            iterator === "increment" || iterator === "default"
                ? this.meta.vars.index++ : iterator === "decrement"
                    ? this.meta.vars.index-- : await Iterator(this.data, iterator);
        };
        for (this.meta.vars.index = Number(start); await Condition(this.data, condition); checkDefault()) {
            const r = await this.data.interpreter.parse(code, this.data, this.data.client);
            lodash.merge(this.data, r);
        }
        this.data.break = false;
        return this.makeReturn(this.meta.yields[this.id] || "")
    }
}
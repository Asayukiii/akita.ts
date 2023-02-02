import { FunctionBuilder } from "../../classes/builder";
import { Utils } from "../../classes/utils";
import { SourceFunction, Data } from "../../../index";
import { inspect } from "util";
import lodash from "lodash";
import Hjson from "hjson";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('var')
        .setValue('description', 'add or get a variable')
        .setValue('use', '$var[key;value?;type?]')
        .setValue('fields', [{
            name: 'key',
            description: 'property to get/set',
            type: 'string',
        }, {
            name: 'value',
            description: 'the value to be given to the variable',
            type: 'any',
        }, {
            name: 'type',
            description: 'the variable force type `(default: unknown)`',
            type: '"unknown" | "string" | "number" | "bigint" | "regexp" | "json"',
        }])
        .setValue('example', '$var[str;hi, im a string] // string var\n$var[num;4] // number var\n$var[obj;{ "leif": "erikson" }] // object var')
        .setValue('returns', 'String'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let fields = d.interpreter.fields(d) as [string, any, string], [key, value, type = "unknown"] = fields;
        if (key.startsWith("invoke:")) {
            value = await Utils.Invoke(d, key, fields.slice(1), d.metadata.vars);
            return { code: d.code?.replace(d.func.id, value) };
        };
        if (value) {
            type = type.toLowerCase();
            if (type == "number" || type != "string" && type != "bigint" && !isNaN(value))
                value = Number(value);
            else if (type == "bigint" || type != "string" && type != "number" && !isNaN(value))
                value = BigInt(value);
            else if (type == "regexp" || type != "string" && ["unknown", "regexp"].includes(type) && /\/(.*?)\/(.+|)/g.test(value)) {
                let splitted = value.split("/");
                value = new RegExp(splitted[1], splitted[2]);
            } else if (["json", "unknown"].includes(type))
                try {
                    value = Hjson.parse(value);
                } catch (e) {
                    if (type == "json") return Utils.Warn("Invalid JSON provided", d, true);
                }
            lodash.set(d.metadata.vars, key, value);
        };
        let v = lodash.get(d.metadata.vars, key, "undefined");
        return {
            code: d.code?.replace(d.func.id, typeof v == "string" ? v : inspect(v, { depth: Infinity }))
        };
    }
}
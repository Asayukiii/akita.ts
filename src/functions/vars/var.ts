import { FunctionBuilder } from "../../classes/builder";
import { Utils } from "../../classes/utils";
import { SourceFunction } from "../../../index";
import { That } from "src/classes/data";
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
    code: async function (this: That) {
        await this.resolveFields()
        let fields = this.fields.split(true) as [string, any, string],
            [key, value, type = "unknown"] = fields;
        if (key.startsWith("invoke:")) {
            value = await Utils.Invoke(this, key, fields.slice(1), this.data.metadata.vars);
            return this.makeReturn(value)
        }
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
                    if (type == "json")
                        return this.warn("Invalid JSON provided")
                }
            this.setVariable(key, value)
        }
        return this.makeReturn(this.variable(key))
    }
}
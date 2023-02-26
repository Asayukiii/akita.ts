import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { camelCase, get, invoke, lowerCase, upperFirst } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('date')
        .setValue('description', 'return the actual date in the provided format')
        .setValue('use', '$date')
        .setValue('example', '$date[stamp]')
        .setValue('fields', [{
            name: 'format',
            type: ''
        }])
        .setValue('returns', 'Number'),
    code: async function () {
        await this.resolveFields()
        let [format] = this.fields.split(true) as string[]
        let date = new Date(new Date().toLocaleString(this.meta.vars._locale, this.meta.vars._timezone))
        switch (lowerCase(format) || "stamp") {
            case "stamp":
                return this.makeReturn(Date.now().toString())
            case "iso": 
                return this.makeReturn(date.toISOString())
            case "time":
                return this.makeReturn(date.toTimeString())
            case "date":
                return this.makeReturn(date.toDateString())
            default:
                return this.makeReturn(get(date, format))
        }
    }
}
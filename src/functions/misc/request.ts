import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import { set, get } from "lodash";
import axios from "axios";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('request')
        .setValue('description', 'make a void return')
        .setValue('use', '$request[url;options?;key?;...properties?]')
        .setValue('fields', [{
            name: 'sentence',
            type: 'string<interpretableCode>'
        }])
        .setValue('example', '$void[$var[hi;asdf]] // creates the variable hi, but does not return its value')
        .setValue('returns', 'Void'),
    code: async function (d: Data) {
        await this.resolveFields()
        let [url, options, _var = "httpResult", ...properties] = this.fields.split(true) as [string, any, ...string[]];
        options = Utils.Object(options) || {}
        let req = await axios.request({
            ...options,
            url
        });
        (_var = _var.trim()) !== "" && set(this.meta.vars, _var, properties.length ? get(req, properties) : req);
        return this.makeReturn(_var !== "" && get(this.meta.vars, _var))
    }
}
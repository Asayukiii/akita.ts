import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";
import axios from "axios";
// import Hjson from "hjson";

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
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let [
            url,
            options,
            _var = "httpResult",
            ...properties
        ] = d.interpreter.fields(d) as [string, any, string, ...string[]];
        options = Utils.Object(options) || {};
        let req = await axios.request({
            ...options,
            url
        });
        lodash.set(d.metadata.vars, _var, properties.length ? lodash.get(req, properties) : req);
        return {
            code: d.code.replace(d.func.id, lodash.get(d.metadata.vars, _var))
        };
    }
}
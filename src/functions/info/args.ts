import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { inspect } from "util";
import { get } from "lodash";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('args')
        .setValue('description', 'get ContextMessageArguments data (if exists)')
        .setValue('use', '$args[key?]')
        .setValue('fields', [{
            name: 'key',
            description: 'property to get',
            type: 'string',
            optional: true
        }])
        .setValue('example', '// my msg: !some-command hi, im sdlg and i hate mid\n$args // all args (hi, im sdlg)\n$args[n] // specific argument ($args[0] = hi,)\n$args[n..m?] // slice arguments ($args[2..4] = sdlg and i)\n$args[length] // arguments size')
        .setValue('returns', 'Unknown'),
    code: async (d: Data) => {
        d.func = await d.func.resolve_fields(d);
        let f = d.interpreter.fields(d), r;
        if (f[0]?.includes("..")) {
            let [
                from = 0,
                to
            ] = f.shift()!.split("..");
            r = d.metadata.args.slice(Number(from), to.trim() == "" ? undefined : Number(to));
            r = f.length > 0 ? get(r, f.join(".")) : r.join(" ");
        } else r = f.length > 0 ? get(d.metadata.args, f.join(".")) : d.metadata.args.join(" ");
        return {
            code: d.code?.replace(d.func.id, typeof r == "string" ? r : inspect(r, { depth: Infinity }) || "")
        };
    }
};
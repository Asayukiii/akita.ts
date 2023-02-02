import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";
import Hjson from "hjson";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('appCmd')
        .setValue('description', '...')
        .setValue('use', '$appCmd[method;...params?]')
        .setValue('fields', [{
            name: 'method',
            type: '"create" | "edit" | "delete"',
        }, {
            name: '...params',
            type: '[object<applicationCommandData>, guildId?] | [applicationCommandResolvable, object<applicationCommandData>, guildId?] | [applicationCommandResolvable, object<applicationCommandData>]'
        }])
        .setValue('example', 'None')
        .setValue('returns', 'Unknown'),
    code: async (d: Data) => {
        d.func.resolve_fields(d);
        let [method, ...params] = d.interpreter.fields(d), result;
        if (method == "create") {
            try {
                var cmd, guild;
                if (Number(params.at(-1)))
                    guild = params.pop();
                cmd = JSON.parse(params.join(";"));
            } catch {
                return Utils.Warn("Invalid JSON provided", d, true);
            }
            result = await d.client.application?.commands.create(cmd, guild);
        } else if (method == "edit") {
            try {
                var cmd, guild;
                if (Number(params.at(-1)))
                    guild = params.pop();
                cmd = JSON.parse(params.slice(1).join(";"));
            } catch {
                return Utils.Warn("Invalid JSON provided", d, true);
            }
            result = await d.client.application?.commands.edit(params[0], cmd, guild);
        } else if (method == "delete") {
            result = await d.client.application?.commands.delete(params[0], params[1]);
        }
        return {
            code: d.code.replace(d.func.id, result || "")
        };
    }
}
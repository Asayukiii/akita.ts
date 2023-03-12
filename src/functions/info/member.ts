import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { Utils } from "../../classes/utils";
import { get } from "lodash";
import { That } from "src/classes/data";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("member")
        .setValue("description", "find a member and get properties")
        .setValue("use", "$member[guild;resolvable;properties?]")
        .setValue("fields", [{
            name: "guild",
            type: "snowflake<guild>"
        }, {
            name: "resolvable",
            type: "string",
        }, {
            name: "properties",
            type: "string",
            optional: true
        }])
        .setValue("example", "$member[Pavez;user;id]")
        .setValue("returns", "Unknown"),
    code: async function (this: That) {
        await this.resolveFields()
        const [guildId = "self", resolvable, ...properties] = this.fields.split(true) as string[],
            guild = guildId.toLowerCase() === "self"
                ? this.data.metadata.ctx.getGuild()
                : this.data.client.guilds.cache.get(guildId);
        if (!guild) return this.warn("invalid guild id provided")
        let member = await Utils.findMember(guild, resolvable), result = "undefined"
        if (!member) return this.makeReturn("undefined")
        result = properties[0]?.startsWith("invoke:")
            ? await Utils.Invoke(this, properties.shift()!, properties, member)
            : get(member, properties.join(".") || "id")
        return this.makeReturn(result)
        // d.func = await d.func.resolve_fields(d);
        // let [resolvable, ...properties] = d.interpreter.fields(d), user = await Utils.findUser(d, resolvable), r;
        // if (!user)
        //     return { code: d.code.replace(d.func.id, "undefined") };
        // if (properties[0]?.startsWith("invoke:"))
        //     r = await Utils.Invoke(d, properties.shift()!, properties, user);
        // else
        //     r = lodash.get(user, properties.join(".") || "id");
        // return {
        //     code: d.code?.replace(d.func.id, r)
        // };
    }
}
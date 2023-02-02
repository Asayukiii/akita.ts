import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction, Data } from "../../../index";
import { Utils } from "../../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('ban')
        .setValue('description', 'bans a user')
        .setValue('use', '$ban[user;options?;guild?]')
        .setValue('fields', [{
            name: 'user',
            description: 'the user Id that will be banned',
            type: 'snowflake<user>'
        }, {
            name: 'options',
            description: 'ban options <small>see more [here](https://discord.js.org/#/docs/discord.js/main/typedef/BanOptions)<small> `(default: {})`',
            type: 'HJSOEncodable',
            optional: true
        }, {
            name: 'guild',
            description: 'the guild Id where the action will take place `(default: ?ContextGuildId)`',
            type: 'snowflake<guild>',
            optional: true
        }])
        .setValue('example', '$ban[$author[id];{ reason: "idk..." }]')
        .setValue('returns', 'Boolean'),
    code: async (d: Data) => {
        await d.func.resolve_fields(d);
        let r, [userId, opts = "{}", guildId = d.metadata?.ctx?.getGuild()?.id!] = d.interpreter.fields(d) as [string, any, string];
        opts = Utils.Object(opts);
        let guild = d.client.guilds.cache.get(guildId);
        if (!guild) return Utils.Warn("invalid guild id provided", d, true);
        r = await guild.bans.remove(userId, opts).catch((e) => {
            Utils.Warn(`failed to ban ${userId.bgYellow} because ${e?.message?.bgYellow || e}`, d);
            return false;
        });
        return {
            code: d.code.replace(d.func.id, r ? "true" : "false")
        };
    }
}
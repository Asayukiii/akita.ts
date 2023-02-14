import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { That } from "src/classes/data";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('unban')
        .setValue('description', 'unbans a user')
        .setValue('use', '$unban[user;reason?;guild?]')
        .setValue('fields', [{
            name: 'user',
            description: 'the user Id that will be unbanned',
            type: 'snowflake<user>'
        }, {
            name: 'reason',
            description: 'the "why" will be unbanned `(default: none)`',
            type: 'string',
            optional: true
        }, {
            name: 'guild',
            description: 'the guild Id where this action will take place `(defalut: ?ContextGuildId)`',
            type: 'snowflake<guild>',
            optional: true
        }])
        .setValue('example', '$unban[772558414605844480;cuz is so hot]')
        .setValue('returns', 'Boolean'),
    code: async function (this: That) {
        await this.resolveFields()
        let [userId, opts, guildId = this.data.metadata.ctx.getGuild()?.id!] = this.fields.split(true)
        let guild = this.data.client.guilds.cache.get(guildId)
        if (!guild) return this.warn("invalid guild id provided")
        let result = await guild.bans.remove(userId, opts).catch(error => {
            this.warn(`failed to unban ${userId.bgYellow} because ${error.message?.bgYellow || error}`)
            return false
        })
        return this.makeReturn(result ? "true" : "false")
        // await d.func.resolve_fields(d);
        // let [userId, opts, guildId = d.metadata.ctx.getGuild()?.id!] = d.interpreter.fields(d);
        // let guild = d.client.guilds.cache.get(guildId);
        // if (!guild)
        //     return Utils.Warn("invalid guild id provided", d, true);
        // let r = await guild.bans.remove(userId, opts).catch((e) => {
        //     Utils.Warn(`failed to unban ${userId.bgYellow} because ${e?.message?.bgYellow || e}`, d);
        //     return false;
        // });
        // return {
        //     code: d.code.replace(d.func.id, r ? "true" : "false")
        // };
    }
}
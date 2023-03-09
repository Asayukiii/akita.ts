// imports
import {
    MentionableSelectMenuComponentData,
    ChannelSelectMenuComponentData,
    StringSelectMenuComponentData,
    MentionableSelectMenuBuilder,
    UserSelectMenuComponentData,
    RoleSelectMenuComponentData,
    ChannelSelectMenuBuilder,
    StringSelectMenuBuilder,
    UserSelectMenuBuilder,
    RoleSelectMenuBuilder,
    AutocompleteInteraction,
    MessagePayloadOption,
    InteractionResponse,
    ButtonComponentData,
    APIButtonComponent,
    ActionRowBuilder,
    BaseInteraction,
    ButtonBuilder,
    EmbedBuilder,
    TextChannel,
    GuildMember,
    EmbedData,
    APIEmbed,
    Message,
    User,
} from "discord.js";
import lodash from "lodash"

// exports
export class Container {
    // @ts-ignore
    public data: Partial<{ components: ActionRowBuilder[]; embeds: EmbedBuilder[]; content: string } | MessagePayloadOption> = {
        fetchReply: false,
        ephemeral: false,
        attachments: undefined,
        components: [] as ActionRowBuilder[],
        content: undefined,
        embeds: [] as EmbedBuilder[],
        files: [] as any[]
    };
    public replyType = "send";
    public instance: any = null;
    constructor() { };
    public reset() {
        this.data = new Container().data;
    };
    public setInstance<T>(instance: T) {
        return (this.instance = instance), this
    }
    public addEmbed(data?: EmbedData | APIEmbed | undefined): this {
        if (this.data.embeds) this.data.embeds.push(new EmbedBuilder(data))
        return this
    }
    public addRow(): this {
        if (this.data.components ||= []) this.data.components.push((new ActionRowBuilder() as any))
        return this
    }
    public addButton(data: Partial<ButtonComponentData> | Partial<APIButtonComponent> | undefined, index = -1): this {
        if (this.data.components?.at(index) instanceof ActionRowBuilder)
            (this.data.components.at(index) as ActionRowBuilder).addComponents(new ButtonBuilder(data))
        return this
    }
    public addStringMenu(data: Partial<StringSelectMenuComponentData>, index = -1): this {
        if (this.data.components?.at(index) instanceof ActionRowBuilder)
            (this.data.components.at(index) as ActionRowBuilder).addComponents(new StringSelectMenuBuilder(data))
        return this
    }
    public addUserMenu(data: Partial<UserSelectMenuComponentData>, index = -1): this {
        if (this.data.components?.at(index) instanceof ActionRowBuilder)
            (this.data.components.at(index) as ActionRowBuilder).addComponents(new UserSelectMenuBuilder(data))
        return this
    }
    public addRoleMenu(data: Partial<RoleSelectMenuComponentData>, index = -1): this {
        if (this.data.components?.at(index) instanceof ActionRowBuilder)
            (this.data.components.at(index) as ActionRowBuilder).addComponents(new RoleSelectMenuBuilder(data))
        return this
    }
    public addChannelMenu(data: Partial<ChannelSelectMenuComponentData>, index = -1): this {
        if (this.data.components?.at(index) instanceof ActionRowBuilder)
            (this.data.components.at(index) as ActionRowBuilder).addComponents(new ChannelSelectMenuBuilder(data))
        return this
    }
    public addMentionableMenu(data: Partial<MentionableSelectMenuComponentData>, index = -1): this {
        if (this.data.components?.at(index) instanceof ActionRowBuilder)
            (this.data.components.at(index) as ActionRowBuilder).addComponents(new MentionableSelectMenuBuilder(data))
        return this
    }
    public async send({
        content = this.data.content,
        ins = this.instance
    } = {}, reset = true): Promise<null | Message | InteractionResponse> {
        if (ins) {
            this.data.content = content;
            var data = null as unknown
            if (ins instanceof BaseInteraction) {
                if (ins instanceof AutocompleteInteraction)
                    data = ins.respond([]).catch(lodash.noop);
                else {
                    (this.replyType != "reply" && (this.replyType = "reply")),
                        (ins.isRepliable() && ins.deferred && (this.replyType = 'editReply'));
                };
                data = await ins[this.replyType]?.(this.data).catch(lodash.noop);
            } else if (ins instanceof Message) {
                data = await ins[this.replyType == 'edit' ? 'edit' : 'reply'](this.data as any).catch(lodash.noop);
            } else if (ins instanceof User || ins instanceof GuildMember || ins instanceof TextChannel) {
                data = await ins
                    .send(this.data as any)
                    .catch(lodash.noop);
            };
            reset && this.reset()
            return data as Message || null;
        } else return null;
    };
};
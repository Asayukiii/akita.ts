// imports
import {
    AutocompleteInteraction,
    ButtonComponentData,
    APIButtonComponent,
    SelectMenuBuilder,
    AttachmentBuilder,
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
import lodash from "lodash";

// exports
export class Container {
    public data: Record<string, any> = {
        fetchReply: false,
        ephemeral: false,
        attachments: [],
        components: [],
        content: null,
        embeds: [],
        files: []
    };
    public replyType = "send";
    public instance: any = null;
    constructor() { };
    public reset() {
        this.data = new Container().data;
    };
    public setInstance<T>(instance: T) {
        return (this.instance = instance), this;
    };
    public addEmbed(data?: EmbedData | APIEmbed | undefined): this {
        return this.data.embeds.push(new EmbedBuilder(data)), this;
    };
    public addRow(): this {
        return this.data.components.push((new ActionRowBuilder())), this;
    };
    public addButton(data: Partial<ButtonComponentData> | Partial<APIButtonComponent> | undefined, index = -1): this {
        return this.data.components.at(index).components.push((new ButtonBuilder(data))), this;
    };
    public addMenu(data: any): this {
        return this.data.components.at(-1).components.push((new SelectMenuBuilder(data))), this;
    };
    public async send({ content = this.data.content, ins = this.instance } = {}, reset = true): Promise<any> {
        if (ins) {
            this.data.content = content;
            var data: any = null;
            if (ins instanceof BaseInteraction) {
                if (ins instanceof AutocompleteInteraction)
                    data = ins.respond([]).catch(lodash.noop);
                else {
                    (this.replyType != "reply" && (this.replyType = "reply")), (ins.isRepliable() && ins.deferred && (this.replyType = 'editReply'));
                };
                data = await ins[this.replyType]?.(this.data).catch(lodash.noop);
            } else if (ins instanceof Message) {
                data = await ins[this.replyType == 'edit' ? 'edit' : 'reply'](this.data).catch(lodash.noop);
            } else if (ins instanceof User || ins instanceof GuildMember || ins instanceof TextChannel) {
                data = await ins
                    .send(this.data)
                    .catch(lodash.noop);
            };
            return (reset && this.reset()), data ?? null;
        } else return null;
    };
};
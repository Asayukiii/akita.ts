// imports
import { MessageOptions } from "child_process";
import djs, {
    AutocompleteInteraction,
    ButtonComponentData,
    InteractionResponse,
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
    Interaction,
} from "discord.js";
import lodash from "lodash";

// exports
export class Container {
    public data: any = {
        fetchReply: false,
        ephemeral: false,
        attachments: [] as any[],
        components: [] as any[],
        content: null,
        embeds: [] as any[],
        files: [] as any[]
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
    public addMenu(
        type: "String" | "User" | "Role" | "Channel" | "Mentionable",
        data: any,
        index = -1
    ): this {
        this.data.components.at(index).components.push((new djs[`${type}SelectMenuBuilder`](data)))
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
                data = await ins[this.replyType == 'edit' ? 'edit' : 'reply'](this.data).catch(lodash.noop);
            } else if (ins instanceof User || ins instanceof GuildMember || ins instanceof TextChannel) {
                data = await ins
                    .send(this.data)
                    .catch(lodash.noop);
            };
            reset && this.reset()
            return data as Message || null;
        } else return null;
    };
};
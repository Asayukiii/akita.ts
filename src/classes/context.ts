// imports
import {
    MessageReaction,
    BaseInteraction,
    BaseChannel,
    GuildMember,
    Message,
    Channel,
    Guild,
    User
} from "discord.js";

// exports
export class Context {
    member: null | GuildMember = null;
    message: null | Message = null;
    channel: null | Channel = null;
    guild: null | Guild = null;
    user: null | User = null;
    data;
    constructor(data: any) {
        this.setData(data);
        this.getMessage();
        this.getChannel();
        this.getMember();
        this.getGuild();
        this.getUser();
    }
    public setData<T>(data: T): this {
        return (this.data = data), this;
    }
    get exactIs(): string {
        return this.data!.constructor.name;
    }
    get is(): "Message" | "Interaction" | "User" | "Member" | "Guild" | "Channel" | "MessageReaction" | "Unknown" {
        return this.data instanceof Message
            ? "Message" : this.data instanceof MessageReaction
                ? "MessageReaction" : this.data instanceof BaseInteraction
                    ? "Interaction" : this.data instanceof User
                        ? "User" : this.data instanceof GuildMember
                            ? "Member" : this.data instanceof Guild
                                ? "Guild" : this.data instanceof BaseChannel
                                    ? "Channel" : "Unknown";
    }
    public setChannel(channel: Channel) {
        return this.channel = channel;
    }
    public setMessage(msg: Message) {
        return this.message = msg;
    }
    public setGuild(guild: Guild) {
        return this.guild = guild;
    }
    public setUser(user: User) {
        return this.user = user;
    }
    public setMember(member: GuildMember) {
        return this.member = member;
    }
    public getChannel(): null | Channel {
        return this.channel
            ? this.channel : "channel" in this.data
                ? this.data.channel : this.is == "User"
                    ? this.data.dmChannel : null;
    }
    public getMessage(): null | Message {
        return this.message
            ? this.message : this.is == "Message"
                ? this.setMessage(this.data) : this.data?.message
                    ? this.setMessage(this.data.message) : null;
    }
    public getGuild(): null | Guild {
        return this.guild
            ? this.guild : this.is == "Guild"
                ? this.setGuild(this.data) : this.data?.guild
                    ? this.setGuild(this.data.guild) : null;
    }
    public getMember(): null | GuildMember {
        return this.member
            ? this.member : this.is == "Member"
                ? this.setMember(this.data) : this.data?.member
                    ? this.setMember(this.data.member) : null;
    }
    public getUser(): null | User {
        return this.user
            ? this.user : this.is == "Message"
                ? this.setUser(this.data.author) : this.is == "User"
                    ? this.setUser(this.data) : this.data?.user
                        ? this.setUser(this.data.user) : null;
    }
}
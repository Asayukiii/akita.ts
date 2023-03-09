import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction } from "../../../index"
import type { ChannelType } from "discord.js"
import { Utils } from "../../classes/utils"
import { isNil } from "lodash"
enum ChannelTypes {
    text, dm, voice, groupdm, category, announcement,
    announcementthread = 10, publicthread, privatethread,
    stagevoice, directory, forum
}

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('addChannelMenu')
        .setValue('description', 'add a channel select menu component at the instance.')
        .setValue('use', '$addChannelMenu[placeholder?;customId;channelTypes?;disabled?;minValues?;maxValues?]')
        .setValue('fields', [{
            name: 'placeholder',
            description: 'Placeholder text if nothing is selected.',
            type: 'string[max_length=150]',
            optional: true
        }, {
            name: 'customId',
            description: 'Custom identifier for the menu.',
            type: 'string[max_length=100]'
        }, {
            name: 'disabled',
            description: 'Whether the menu is disabled `(default: false)`.',
            type: 'boolean',
            optional: true
        }, {
            name: 'channelTypes?',
            description: 'List of channel types to include in this menu `(separator: ,)`.',
            type: '"Text" | "DM" | "Voice" | "groupDM" | "Category" | "Announcement" | "AnnouncementThread" | "PublicThread" | "PrivateThread" | "StageVoice" | "Directory" | "Forum"'
        }, {
            name: 'minValues',
            description: 'Minimum number of options that must be chosen `(default: 1)`.',
            type: 'number[0,25]',
            optional: true
        }, {
            name: 'maxValues',
            description: 'Maximum number of options that can be chosen `(default: 1)`.',
            type: 'number[1,25]',
            optional: true
        }])
        .setValue('example', '$addChannelMenu[select some channel;channel_menu_1;text]')
        .setValue('returns', 'Void'),
    code: async function () {
        await this.resolveFields()
        let [placeholder, customId, type, disabled = "false", min = 1, max = 1] = this.fields.split(true) as string[],
            channelTypes: undefined | ChannelType[] = undefined
        if (typeof type === "string")
            channelTypes = type.split(",")
                .map(t => {
                    t = t.trim().toLowerCase()
                    return isNaN(t as any) ? ChannelTypes[t] : Number(t)
                }).filter(t => isNil(ChannelTypes[t]) === false)
        this.meta.ctn.addChannelMenu({
            disabled: Utils.booleanify(disabled),
            minValues: Number(min),
            maxValues: Number(max),
            channelTypes,
            placeholder,
            customId,
        })
        return this.makeReturn("")
    }
}
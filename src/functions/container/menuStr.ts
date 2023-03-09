import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction } from "../../../index"
import { Utils } from "../../classes/utils"
import { endsWith, startsWith } from "lodash"

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('addStringMenu')
        .setValue('description', 'add a string select menu component at the instance.')
        .setValue('use', '$addStringMenu[placeholder?;customId;disabled?;options;minValues?;maxValues?]')
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
            name: 'options',
            description: 'Specified choices for the menu.',
            type: '[SelectMenuComponentOptionData](https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure)[]'
        }, {
            name: 'disabled',
            description: 'Whether the menu is disabled `(default: false)`.',
            type: 'boolean',
            optional: true
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
        .setValue('example', '$addStringMenu[select some;menu_1;[{\n\tlabel: "no. 1",\n\tvalue: "option_1"\n}, {\n\tlabel: "no. 2",\n\tvalue: "option_2"}]]')
        .setValue('returns', 'Void'),
    code: async function () {
        await this.resolveFields()
        let [placeholder, customId, options, disabled = "false", min = 1, max = 1] = this.fields.split(true) as [string, string, any]
        if (startsWith(options, "[") == false) options &&= "[" + options
        if (endsWith(options, "]") == false) options &&= options + "]"
        options = Utils.Object(options)
        this.meta.ctn.addStringMenu({ 
            disabled: Utils.booleanify(disabled),
            minValues: Number(min),
            maxValues: Number(max),
            placeholder, 
            customId,
            options
        })
        return this.makeReturn("")
    }
}
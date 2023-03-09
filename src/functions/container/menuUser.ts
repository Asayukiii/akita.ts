import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction } from "../../../index"
import { Utils } from "../../classes/utils"

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('addUserMenu')
        .setValue('description', 'add a user select menu component at the instance.')
        .setValue('use', '$addUserMenu[placeholder?;customId;disabled?;minValues?;maxValues?]')
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
        .setValue('example', '$addUserMenu[select some member;user_menu_1]')
        .setValue('returns', 'Void'),
    code: async function () {
        await this.resolveFields()
        let [placeholder, customId, disabled = "false", min = 1, max = 1] = this.fields.split(true) as string[]
        this.meta.ctn.addUserMenu({ 
            disabled: Utils.booleanify(disabled),
            minValues: Number(min),
            maxValues: Number(max),
            placeholder, 
            customId
        })
        return this.makeReturn("")
    }
}
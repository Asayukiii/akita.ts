import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction } from "../../../index"
import { Utils } from "../../classes/utils"

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('addButton')
        .setValue('description', 'add a button component at the instance.')
        .setValue('use', '$addButton[label;style;customId;disabled?;emoji?]')
        .setValue('fields', [{
            name: 'label',
            description: 'The text that appears on the button.',
            type: 'string[max_length=80]',
        }, {
            name: 'style',
            description: 'The button style `(Primary=1; Secondary=2; Success=3; Danger=4; Link=5)`.',
            type: 'number[1,5]'
        }, {
            name: 'customId',
            description: 'Custom identifier for the button `(If the style is 5, the URL should go here)`.',
            type: 'string[max_length=80]'
        }, {
            name: 'disabled',
            description: 'Whether the button is disabled `(default: false)`.',
            type: 'boolean',
            optional: true
        }, {
            name: 'emoji',
            description: 'The emoji that appears on the button.',
            type: 'string',
            optional: true
        },])
        .setValue('example', '$addButton[press me!;1;button_1]')
        .setValue('returns', 'Void'),
    code: async function () {
        await this.resolveFields()
        const [label, style, id, disabled = "false", emoji] = this.fields.split(true) as string[], data = {
            disabled: Utils.booleanify(disabled),
            style: Number(style),
            label,
            emoji
        }
        data[style === "5" ? "url" : "customId"] = id
        this.meta.ctn.addButton(data)
        return this.makeReturn("")
    }
}
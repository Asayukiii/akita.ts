import { FunctionBuilder } from "../../classes/builder"
import { SourceFunction } from "../../../index"
import { That } from "src/classes/data"
import { random } from "lodash"

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('randomChoice')
        .setValue('description', '...')
        .setValue('use', '$randomChoices[...choices]')
        .setValue('fields', [{
            name: 'choices',
            type: 'any'
        }])
        .setValue('example', '$randomChoice[a;b;c;d] // random value')
        .setValue('returns', 'Any'),
    code: async function (this: That) {
        await this.resolveFields()
        let choices = this.fields.split(true)
        return this.makeReturn(choices[random(choices.length)])
    }
}
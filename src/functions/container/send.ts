import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { Utils } from "../../classes/utils";
import { That } from "src/classes/data";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName('send')
        .setValue('description', 'send the instance')
        .setValue('use', '$send[returnId]')
        .setValue('fields', [{
            name: 'returnId',
            description: 'whether or not to return message Id `(default: no)`',
            type: 'boolean',
        }])
        .setValue('example', '$send[no]')
        .setValue('returns', 'returnId ? Snowflake : Void'),
    code: async function (this: That) {
        await this.resolveFields()
        let result = await this.meta.ctn.send();
        return this.makeReturn(Utils.booleanify(this.inside!) ? result?.id : "")
    }
};
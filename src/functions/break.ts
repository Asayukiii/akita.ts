import {FunctionBuilder} from '../classes/builder';
import {SourceFunction} from '../../index';

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('break')
    .setValue('description', 'Break the code'),
    code: async d => {
        d.break = true
        return {
            code: d.code.resolve(d.func, '')
        }
    }
}
import {FunctionBuilder} from '../classes/builder';
import {SourceFunction} from '../../index';

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('host')
    .setValue('description', 'Show the hostname.'),
    code: async d => {
        return {
            code: d.code.resolve(d.func, d.req.hostname||'undefined')
        }
    }
}
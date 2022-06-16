import {FunctionBuilder} from '../classes/builder';
import {SourceFunction} from '../../index';
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('fixed')
    .setValue('description', 'Fix a number.'),
    code: async d => {
        let r = d.unpack(d);
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 2) return Utils.Warn('Invalid fields provided in:', d.func)
        let [ number, fix ] = r.splits;
        fix ? fix : fix = '0';
        if(!Utils.isNumber(number)) return Utils.Warn('Invalid number provided in:', d.func)
        if(!Utils.isNumber(fix)) return Utils.Warn('Invalid fix provided in:', d.func)
        
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, Number(number).toFixed(Number(fix)))
        }
    }
}
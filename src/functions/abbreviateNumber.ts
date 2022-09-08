import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils, symbols } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('abbreviateNumber')
    .setValue('description', 'Abbreviates the provided number.')
    .setValue('use', '$abbreviateNumber[number;decimals?]')
    .setValue('returns', 'String'),
    code: async d => {
        let r = d.unpack(d);
        if (!r.inside) return Utils.Warn('Invalid inside provided in:', d.func);
        let [number, decimals = 2] = r.splits;
        if(!number) return Utils.Warn('Missing number in:', d.func);
        if(typeof(decimals) != 'string') return Utils.Warn('Invalid decimals provided:', d.func);
        let tier = Math.floor(Math.log10(Math.abs(Number(number) || 1)) / 3); 
        if (tier === 0) {
            return {
                code: d.code.resolve(`${d.func}[${r.inside}]`, number)
            };
        } else {          
            let symbol = symbols[tier - 1]; 
            let abbreviated = Number(number) / (Math.pow(10, tier * 3)); 
            let result = abbreviated.toFixed(Number(decimals)) + symbol;
            return {
                code: d.code.resolve(`${d.func}[${r.inside}]`, result)
            };
        }
    }
}
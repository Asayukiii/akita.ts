import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import axios from "axios";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('request')
    .setValue('description', 'Make a http request with GET method.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let [ link, headers ] = [ r.splits[0], r.splits.slice(1) ]
        let obj: Record<string, any> | undefined = undefined
        if(headers.length) {
            obj = {}
            for(const header of headers) {
                let n = header?.split(':')?.[0]
                let v = header?.split(':')?.[1]
                if(!n || !v) {
                    Utils.Warn('Invalid header provided in:', d.func)
                    continue
                } else {
                    obj[n] = v
                }
            }
        }
        const result = await axios.get(link, obj).catch(e=>null)
        d._.request_data = result?.data
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
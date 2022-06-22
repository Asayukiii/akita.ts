import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import axios, { AxiosRequestConfig } from "axios";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('request')
    .setValue('description', 'Make a http request.'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        let [ link, config, ...headers ] = r.splits
        let obj: AxiosRequestConfig = { url: link.unescape()! }
        const resolved = Utils.loadObject(config)
        if(config) {
            /**
             * {
             *   method: string,
             *   data: any,
             *   logError: boolean
             * }
             */
            if(!resolved) return Utils.Warn('Invalid JSON configuration provided in:', d.func)
            if(resolved.method) obj.method = resolved.method
            if(resolved.data) obj.data = resolved.data
        }
        if(headers.length) {
            if(!obj.headers) obj.headers = {}
            for(const header of headers) {
                let n = header?.split(':')?.[0]
                let v = header?.split(':')?.[1]
                if(!n || !v) {
                    Utils.Warn('Invalid header provided in:', d.func)
                    continue
                } else {
                    obj.headers[n] = v
                }
            }
        }
        let b = await axios(obj).catch(e => {
            console.log(resolved, e)
            if(resolved?.logError) { console.log(e); return null } else { return null }
        })
        d._.request_data = b?.data
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
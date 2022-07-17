import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('send')
    .setValue('description', 'Send something to the request.')
    .setValue('use', '$send[status;type(json/safe/canvas/file/redirect/other);body]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 3) return Utils.Warn('Invalid fields provided in:', d.func)
        let [ status, type, body, aggent ] = r.splits
        if(!Utils.isNumber(status)) return Utils.Warn('Invalid status provided in:', d.func)
        if(type.toLowerCase() === 'json') {
            let obj = Utils.loadObject(body.unescape()!)
            if(!obj) return Utils.Warn('Invalid JSON provided in:', d.func)
            d.res.status(parseInt(status)).json(obj)
        } else if(type.toLowerCase() === 'safe') {
            let b = d._.object
            if(!b) return Utils.Warn('No object was found, create one first. In:', d.func)
            b = JSON.parse(JSON.stringify(b).unescape()!)
            d.res.status(parseInt(status)).json(b)
        } else if(type.toLowerCase() === 'canvas') {
            let canvas = d._.Canvas?.canvas
            if(!canvas) return Utils.Warn('No canvas was found, create one first. In:', d.func)
            d.res.set('Content-Type', aggent || 'image/png')
            d.res.status(parseInt(status)).send(canvas.toBuffer(aggent || 'image/png'))
        } else if(type.toLowerCase() === 'file') {
            d.res.status(parseInt(status)).sendFile(body!.unescape()!)
        } else if(type.toLowerCase() === 'other') {
            d.res.status(parseInt(status)).send(body.unescape())
        } else if(type.toLowerCase() === 'redirect') {
            d.res.redirect(body.unescape()!)
        }
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
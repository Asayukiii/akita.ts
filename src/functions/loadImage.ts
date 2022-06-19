import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import { readFile } from "fs/promises";
import Canvas from "@napi-rs/canvas";
import axios from "axios";

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('loadImage')
    .setValue('description', 'Load a new image and save it as an ID.'),
    code: async d => {
        // $loadImage[id;type(path|url);body]
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 3) return Utils.Warn('Invalid fields provided in:', d.func)
        let [ id, type, body ] = r.splits
        if(!['path', 'url', 'link'].some(w => w === type.toLowerCase())) return Utils.Warn('Invalid type provided in:', d.func)
        const img = new Canvas.Image()
        let loaded = true
        if(type.toLowerCase() === 'path') {
            const file = await readFile(body).catch(e=>null)
            if(!file) return Utils.Warn('Invalid image path provided in:', d.func)
            img.src = file
        } else if(type.toLowerCase() === 'url' || type.toLowerCase() === 'link') {
            const file = await axios.get(body.unescape()!.replace('.webp', '.png'), { responseType: 'arraybuffer' }).catch(e=>null)
            const data: any = file ? (await file.data): null
            if(data) {
                img.src = data
            } else {
                loaded = false
            }
        }
        if(!d._.Images) d._.Images = {}
        d._.Images[id] = loaded ? img: null
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}
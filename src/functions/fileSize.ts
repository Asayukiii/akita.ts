import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import fs from 'fs';

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('fileSize')
    .setValue('description', 'Returns the file size, if the file exists.')
    .setValue('use', '$fileSize[path;decimals?]')
    .setValue('returns', 'String'),
    code: async d => {
        let r = d.unpack(d);
        if (!r.inside) return Utils.Warn('Invalid inside provided in:', d.func);
        let [path, decimals = 2] = r.splits;
        if (!path) return Utils.Warn('Path is required in:', d.func);
        if (isNaN(Number(decimals)) || Number(decimals) < 0) return Utils.Warn('Invalid decimal count in:', d.func);
        try {
            let file = fs.statSync(path)
            let result = (file.size / 1024).toFixed(Number(decimals))
            return {
                code: d.code.resolve(`${d.func}[${r.inside}]`, result)
            };
        } catch(err) {
            return Utils.Warn('Invalid path provided in:', d.func)
        }
    }
}
import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import fs from 'fs';

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('fileExists')
    .setValue('description', 'Check if file exists in the provided path.')
    .setValue('use', '$fileExists[path]')
    .setValue('returns', 'Boolean'),
    code: async d => {
        let r = d.unpack(d);
        if (!r.inside) return Utils.Warn('Invalid inside provided in:', d.func);
        let [path] = r.splits;
        if (!path) return Utils.Warn('Path is required in:', d.func);
        try {
            let result: any = fs.existsSync(path)
            return {
                code: d.code.resolve(`${d.func}[${r.inside}]`, result)
            };
        } catch(err) {
            return Utils.Warn('Invalid path provided in:', d.func);
        }
    }
}
import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import fs from 'fs';

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('readFile')
    .setValue('description', 'Reads a file, if the file exists.')
    .setValue('use', '$readFile[path]')
    .setValue('returns', 'String'),
    code: async d => {
        let r = d.unpack(d);
            if (!r.inside) return Utils.Warn('Invalid inside provided in:', d.func);
        let [path] = r.splits;
            if (!path) return Utils.Warn('Path is required in:', d.func);
        try {
            const file = fs.readFileSync(path)
            return {
                code: d.code.resolve(`${d.func}[${r.inside}]`, file?.toString?.())
            };
        } catch(err) {
            return Utils.Warn('Invalid path provided in:', d.func);
        }
    }
}
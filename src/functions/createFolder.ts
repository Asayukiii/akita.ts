import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import fs from 'fs';

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('createFolder')
    .setValue('description', 'Creates a directory using path as reference.')
    .setValue('use', '$createFolder[path]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d);
            if (!r.inside) return Utils.Warn('Invalid inside provided in:', d.func);
        let [path] = r.splits;
            if (!path) return Utils.Warn('Path is required in:', d.func);
        try {
            fs.mkdirSync(path)
            return {
                code: d.code.resolve(`${d.func}[${r.inside}]`, '')
            };
        } catch(err) {
            return Utils.Warn('Error trying to create the folder.', d.func);
        }
    }
}
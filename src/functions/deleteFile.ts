import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils } from "../classes/utils";
import fs from 'fs';

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('deleteFile')
    .setValue('description', 'Deletes a file, if the file exists.')
    .setValue('use', '$deleteFile[path]')
    .setValue('returns', 'Void'),
    code: async d => {
        let r = d.unpack(d);
            if (!r.inside) return Utils.Warn('Invalid inside provided in:', d.func);
        let [path] = r.splits;
            if (!path) return Utils.Warn('Path is required in:', d.func);
        try {
            fs.unlinkSync(path)
            return {
                code: d.code.resolve(`${d.func}[${r.inside}]`, '')
            };
        } catch(err) {
            return Utils.Warn('Error trying to delete the provided file.', d.func);
        }
    }
}
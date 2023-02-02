import { minify } from "uglify-js";
import { filter } from "lodash";
import { cwd } from "process";
import fs from "fs";

async function main(i: string): Promise<fs.Dirent[]> {
    var e = fs.readdirSync(i, { withFileTypes: !0 }).map((e: fs.Dirent) => (e.name = `${i}/${e.name}`, e)),
        r = filter(e, (e => e.isFile() && e.name.endsWith(".js"))),
        n = filter(e, (e => e.isDirectory()));
    for (var a of n) r.push(...(await main(a.name)));
    for (var a of r) {
        var x = fs.readFileSync(a.name, { encoding: "utf-8" }),
            ifyed = minify(x)?.code as string;
        if (!ifyed || ifyed == x) continue;
        fs.writeFileSync(a.name, ifyed, "utf-8");
    };
    return r;
};

main(cwd() + "/dist/");

// async function optimizePath (i) {
//     const e = await fs.readdirSync(i, {
//             withFileTypes: !0
//         }).map(e => (e.name = i + "/" + e.name, e)),
//         r   = e.filter(e => e.isFile() && e.name.endsWith(".js")),
//         n   = e.filter(e => e.isDirectory());
//     for (var a of n) {
//         a = await optimizePath(a.name);
//         r.push(...a);
//     };
//     for (var i of r) {
// 				var x = fs.readFileSync(i.name).toString(),
// 					ifyed = minify(x)?.code;
// 				if (ifyed == x) continue;
//         fs.writeFileSync(i.name, ifyed, "utf8");
//     };
// 	return r;
// };

// async function prettyPath (i, end = ".ts") {
//     const e = await fs.readdirSync(i, {
//             withFileTypes: !0
//         }).map(e => (e.name = i + "/" + e.name, e)),
//           r = e.filter(e => e.isFile() && e.name.endsWith(end)),
//           n = e.filter(e => e.isDirectory());
//     for (var a of n) {
//         a = await prettyPath(a.name);
//         r.push(...a);
//     };
//     for (var i of r) {
// 				var x = fs.readFileSync(i.name).toString(),
// 					ifyed = beautify(x);
// 				if (ifyed == x) continue;
//         fs.writeFileSync(i.name, ifyed, "utf8");
//     };
// 	return r;
// };
// module.exports = {
// 	optimizeCode (str, opts) {
// 		return beautify(minify(str)?.code, opts);
// 	},
//     prettyCode (str, opts) {
//         return beautify(str, opts);
//     },
// 	async optimizeDist () {
// 		return await optimizePath(process.cwd() + '/dist/');
// 	},
//     async prettySrc () {
//         return await prettyPath(process.cwd() + '/src/');
//     },
// 	optimizePath,
//     prettyPath
// };
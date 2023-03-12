import { minify } from "uglify-js"
import { filter } from "lodash"
import { cwd } from "process"
import fs from "fs"

async function main(i: string): Promise<fs.Dirent[]> {
    const e = fs.readdirSync(i, { withFileTypes: !0 }).map((e: fs.Dirent) => (e.name = `${i}/${e.name}`, e)),
        r = filter(e, (e => e.isFile() && e.name.endsWith(".js"))),
        n = filter(e, (e => e.isDirectory()))
    for (const a of n) r.push(...(await main(a.name)))
    for (const a of r) {
        const x = fs.readFileSync(a.name, { encoding: "utf-8" }),
            ifyed = minify(x)?.code as string;
        if (!ifyed || ifyed == x) continue;
        fs.writeFileSync(a.name, ifyed, "utf-8")
    }
    return r
}

main(cwd() + "/dist/")
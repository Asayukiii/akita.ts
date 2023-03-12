const mod = process.cwd() + "/dist/functions/", docs = {};
import { SourceFunction } from "index";
import { upperFirst as u, escape } from "lodash";
import fs from "fs";

function e(str: string): string {
    return escape(str).replace(/\|/g, "&#124;")
}

function docify(func: SourceFunction) {
    const str: string[] = [];
    str.push(
        `# **${func.data.name}**`,
        `> **${u(e(func.data.extra?.description as string))}** <br/>`,
        `> ${e(func.data.extra?.use as string)}`,
        "- - -",
        ""
    )
    if (func.data.extra?.fields) {
        str.push(
            "### Fields",
            "| name | description | type | required |",
            "|------|-------------|------|----------|",
            ...func.data.extra.fields.map(field => `| ${u(field.name)} | ${u(field.description || "unknown")} | ${u(e(field.type))} | ${field.optional ? "False" : "True"} |`),
            ""
        )
    }
    str.push(
        "### Returns",
        `> ${u(e(func.data.extra?.returns || "Unknown"))}`,
        "",
        "### Example",
        "> ```php",
        func.data.extra?.example || "None",
        "```"
    )
    return str.join("\n")
}

void async function main() {
    for (const folder of fs.readdirSync(mod)) {
        for (const file of fs.readdirSync(`${mod}/${folder}/`)) {
            const r: SourceFunction | undefined = (await import(`../functions/${folder}/${file}`)).data
            if (r) {
                docs[r.data.name] = docify(r);
                fs.writeFileSync(process.cwd() + "/doc/functions/" + r?.data.name + ".md", docs[r.data.name], "utf-8");
            }
        }
    }
}()

fs.writeFileSync(process.cwd() + "/doc/_sidebar.md", Object.keys(docs).map(a => `* [${a}](functions/${a}.md)`).join("\n"), "utf-8");
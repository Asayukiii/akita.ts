const mod = process.cwd() + "/dist/functions/", docs = {};
import { SourceFunction } from "index";
import _, { upperFirst, escape as _escape } from "lodash";
import fs from "fs";

function escape (str: string): string {
    return _escape(str)
        .replace(/\|/g, "&#124;");
};

function docify(func: SourceFunction) {
    const str = new Array();
    str.push(`# **${func.data.name}**`);
    str.push(`> **${upperFirst(escape(func.data.extra?.description))}** <br/>`);
    str.push(`> ${escape(func.data.extra?.use)}`)
    str.push("- - -")
    str.push("");
    if (func.data.extra?.fields) {
        str.push("### Fields");
        str.push("| name | description | type | required |");
        str.push("|------|-------------|------|----------|");
        for (const field of func.data.extra.fields) {
            str.push(`| ${upperFirst(field.name)} | ${upperFirst(field.description || "unknown")} | ${upperFirst(escape(field.type))} | ${field.optional ? "False" : "True"} |`)
        };
        str.push("");
    };
    str.push("### Returns");
    str.push(`> ${upperFirst(escape(func.data.extra?.returns) || "Unknown")}`);
    str.push("");
    str.push("### Example");
    str.push("> ```php");
    str.push(func.data.extra?.example);
    return str.push("```"), str.join("\n");
};

for (const folder of fs.readdirSync(mod)) {
    for (const file of fs.readdirSync(`${mod}/${folder}/`)) {
        const r: SourceFunction | undefined = require(`../functions/${folder}/${file}`).data
        if (r) {
            docs[r.data.name] = docify(r);
            fs.writeFileSync(process.cwd() + "/doc/functions/" + r?.data.name + ".md", docs[r.data.name], "utf-8");
        };
    };
};

fs.writeFileSync(process.cwd() + "/doc/_sidebar.md", Object.keys(docs).map(a => `* [${a}](functions/${a}.md)`).join("\n"), "utf-8");
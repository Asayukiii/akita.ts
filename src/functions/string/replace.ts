import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("replace")
        .setValue("description", "...")
        .setValue("use", "$replace[text;pattern;replacer]")
        .setValue("fields", [{
            name: "text",
            type: "string"
        }, {
            name: "pattern",
            type: "string | regexp"
        }, {
            name: "replacer",
            type: "string | void"
        }])
        .setValue("example", "$replace[hello mid;hello;uwu]")
        .setValue("returns", "Void"),
    code: async function () {
        await this.resolveFields()
        let [text, pattern, replacer] = this.fields.split(true) as [string, string | RegExp, string]
        if (text.startsWith("var:")) {
            const value = this.variable(text = text.slice(4))
            if (typeof value !== "string") return this.warn(`Variable ${text.bgYellow} is not a string`)
            text = value
        }
        if (/\/(.*?)\/(.+)?/g.test(pattern as string)) {
            const splitted = (pattern as string).split("/")
            pattern = new RegExp(splitted.slice(1, -1).join("/"), splitted.at(-1))
        }
        if (replacer.startsWith("run:")) {
            const callback = this.data.client.cbs[replacer = replacer.slice(4)]
            if (callback) {
                text = await text.asyncReplace(pattern, async (...params) => {
                    const data = await this.data.interpreter.parse(callback.trim().replace(/\$(\d+)/g, (_, a) => {
                        return params[Number(a) - 1]
                    }), this.data, this.data.client)
                    return data?.metadata?.yields?.[0] || data?.code || ""
                })
                return this.makeReturn(text)
            } else return this.warn(`callback ${callback.bgYellow} does not exists`)
        }
        return this.makeReturn(text.replace(pattern, replacer))
    }
}
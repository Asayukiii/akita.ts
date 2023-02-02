import { Data, Falsy } from "index";
import lodsh from "lodash";

String.prototype.replaceLast = function name(p: string | RegExp, r?: string) {
    const match = typeof p === "string"
        ? p : (this.match(p) || []).slice(-1)[0];
    if (!match) return this as string;
    const last = this.lastIndexOf(match);
    return last !== -1 ? `${this.slice(0, last)}${r}${this.slice(last + match.length)}` : this as string;
};

export interface ObjectWithFuncs {
    [key: string]: FnD;
};

interface field {
    value: string;
    overs: FnD[];
};

export interface FnD {
    resolve_fields: (data: Data, start?: number, end?: number | Falsy) => Promise<FnD>;
    resolve_field: (data: Data, index: number) => Promise<FnD>;
    fields: null | field[];
    inside: null | string;
    total: string;
    name: string;
    id: string;
};

export class Compiler {
    _matched: ObjectWithFuncs | null = null;
    matched: ObjectWithFuncs | null = null;
    functions: string[] = new Array();
    regex: RegExp | null = null;
    result: string = "";
    code: null | string;
    constructor(code: string) {
        this.code = code;
    };

    /**
     * Set functions and regexp
     * @param fns array of strings with all functions names
     * @returns this
     */
    public set_functions(fns: string[]): this {
        fns = fns.sort((a: string, b: string) => b.length - a.length);
        this.functions = fns;
        this.regex = new RegExp(`(${fns.map(a => a.replace("$", "\\$")).join("|")})`, "g");
        return this;
    };

    public set_code(code: string): string {
        return this.code = code;
    };

    match(): ObjectWithFuncs | undefined {
        if (!this.regex || !this.code)
            return;
        let fns: ObjectWithFuncs = {}, code = this.code;
        Array.from(this.code.matchAll(this.regex))
            .reverse()
            ?.map((fnr: RegExpMatchArray, index: number) => {
                const splitted = code
                    .split(fnr[0])
                    .slice(-1)
                    .join(""), id = "FUNCTION_" + index;
                if (splitted.startsWith("[")) {
                    let inside = "", n = 0, total: string;
                    for (let char of splitted.slice(1)) {
                        if (char == "]" && n <= 0) break;
                        if (char == "[")
                            inside += char, n++;
                        else if (char == "]" && n > 0)
                            inside += char, n--;
                        else inside += char;
                    };
                    total = `${fnr[0]}[${inside}]`;
                    fns[id] = {
                        resolve_fields: () => void 0 as unknown as Promise<FnD>,
                        resolve_field: () => void 0 as unknown as Promise<FnD>,
                        fields: inside.split(";").map((f: string) => ({ value: f.trim(), overs: [] })),
                        name: fnr[0],
                        inside,
                        total,
                        id
                    };
                    code = code.replaceLast(total, id);
                } else {
                    fns[id] = {
                        resolve_fields: () => void 0 as unknown as Promise<FnD>,
                        resolve_field: () => void 0 as unknown as Promise<FnD>,
                        fields: null,
                        inside: null,
                        total: fnr[0],
                        name: fnr[0],
                        id
                    };
                    code = code.replaceLast(fnr[0], id);
                };
            });
        let cloned = (this._matched = fns), array = Object.values(fns);
        array.forEach((fn: FnD) => {
            if (!fn.inside || !fn.fields) return;
            if (array.some((F: FnD) => F.fields?.some((f: field) => f.overs.some((o: FnD) => o.id == fn.id))))
                return delete fns[fn.id];
            fn.fields.forEach((field: field, index: number) => {
                let possible_functions = field.value.match(/FUNCTION_\d+/g);
                possible_functions?.forEach((possible_over: string) => {
                    if (cloned[possible_over]) {
                        fns[fn.id].fields![index].overs.push(cloned[possible_over]);
                        delete fns[possible_over];
                    };
                });
            });
        });
        this.result = code;
        return this.matched = fns;
    };
};
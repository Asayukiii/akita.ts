import { Application, Request, Response } from "express";
import { SourceFunction, UnpackedFunction, Data, Endpoints } from "../../index";
import fs from 'fs'

export class Interpreter {
    public functions: SourceFunction[]
    public app: Application
    public routes: Endpoints
    constructor(app: Application, routes: Endpoints) {
        this.functions = []
        this.app = app
        this.routes = routes
        this.load()
    }
    private unpack(d: Data): UnpackedFunction {
        const r = d.code.split(d.func).length - 1;
        const inside = d.code.split(d.func)[r].after()
        let splits = inside?.split(';') || []
        return {
            name: d.func.replace('$', ''),
            inside: inside,
            splits: splits,
        }
    }
    public async parse(text: string, req: Request, res: Response): Promise<any> {
        if(!text) return;
        let data: Data = { 
            app: this.app, code: text.replace(/\$[a-zA-Z]+[^\[]/g, x => x.toLowerCase()),
            func: '', unpack: this.unpack,
            req,
            res,
            break: false,
            _: {},
            routes: this.routes
        }
        let funcs = data.code.split('$')
        data.code = funcs.join('$')
        for(let i = funcs.length - 1; i > 0; i--) {
            if(data.break) break;
            let split = "$" + funcs[i]
            let name = split.split('$')[1]?.split('[')?.[0]?.trim()?.toLowerCase()
            let func = this.functions.find(f => name == f.data.name.toLowerCase())
            if(!func) continue;
            data.func = '$'+ func.data.name.toLowerCase()
            if(func) {
                let loaded = await func.code(data)
                if(loaded) {
                    data.code = loaded.code?.trim()
                }
            }
        }
        return data.code
    }
    public addFunction(func: SourceFunction): void {
        this.functions[this.functions.length] = func
    }
    private load(): void {
        let dirs = fs.readdirSync('./dist/functions')
        for(const file of dirs) {
            const r: SourceFunction | undefined = require(`../functions/${file}`).data
            if(!r) continue;
            this.addFunction(r)
        }
        String.prototype.resolve = function (w: string, r: string) {
            let p_s = this.split(w)
            let last = p_s.pop()
            return p_s.join(w) + r + last
        }
        String.prototype.after = function () {
            const afterIndex = this.indexOf("[");
            const after = this.replace(/(\s|\n)/gim, "").startsWith("[")
              ? this.split("[").slice(1).join("[")
              : undefined;
          
            let inside;
          
            if (after) {
              const rightIndexes = searchIndexes("[", after);
              const leftIndexes = searchIndexes("]", after);
          
              if (leftIndexes.length === 0) {
                inside = after;
              } else if (rightIndexes.length === 0) {
                inside = after.substring(0, leftIndexes[0]);
              } else {
                const merged = [];
          
                let leftIndex = 0;
          
                for (let i = 0; i < rightIndexes.length; ++i) {
                  const right = rightIndexes[i];
          
                  let left = leftIndexes[leftIndex];
          
                  while (left < right && typeof left === "number") {
                    merged.push({
                      index: left,
                      isLeft: true,
                    });
          
                    left = leftIndexes[++leftIndex];
                  }
                  merged.push({
                    index: right,
                    isLeft: false,
                  });
          
                  if (typeof left !== "number") break;
                }
          
                while (leftIndex < leftIndexes.length) {
                  const left = leftIndexes[leftIndex++];
          
                  merged.push({
                    index: left,
                    isLeft: true,
                  });
                }
          
                let index = 0;
                let depth = 1;
          
                for (let i = 0; i < merged.length; ++i) {
                  const obj = merged[i];
          
                  index = obj.index;
          
                  if (obj.isLeft) --depth;
                  else ++depth;
          
                  if (!depth) break;
                }
          
                if (depth) index = after.length;
          
                inside = after.substring(0, index);
              }
            }
            return inside || null
        }
    }
}

function searchIndexes(pat: string, txt: string) {
    const patLength = pat.length;
    const txtLength = txt.length;

    const lps = new Array(patLength).fill(0);

    processPattern(pat, patLength, lps);

    const indexes = [];

    let patIndex = 0;
    let txtIndex = 0;

    while (txtIndex < txtLength) {
        if (pat[patIndex] === txt[txtIndex]) {
            ++patIndex;
            ++txtIndex;
        }

        if (patIndex === patLength) {
            indexes.push(txtIndex - patIndex);
            patIndex = lps[patIndex - 1];
        } else if (txtIndex < txtLength && pat[patIndex] !== txt[txtIndex]) {
            if (patIndex !== 0) {
                patIndex = lps[patIndex - 1];
            } else {
                ++txtIndex;
            }
        }
    }

    return indexes;
}

function processPattern(pat: string, patLength: number, lps: any[]) {
    let len = 0;
    let index = 1;

    while (index < patLength) {
        if (pat[index] === pat[len]) {
            ++len;
            lps[index++] = len;
        } else if (len !== 0) {
            len = lps[len - 1];
        } else {
            lps[index++] = 0;
        }
    }
}
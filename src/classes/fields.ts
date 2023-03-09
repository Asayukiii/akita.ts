import { Utils } from "./utils"
import { Data } from "index"

export interface Options {
    limit: number | undefined
}

export class Fields {
    private options: Options
    private data: Data
    public fields: any[] = []
    constructor(data: Data, options: Options = { limit: undefined }) {
        this.options = options
        this.data = data
        const fields = data.func.fields?.map(f => f.value) || []
        if (fields && options.limit) {
            for (let i = 0; i < options.limit; i++) {
                if (i == options.limit) this.fields[i] = fields.join(";")
                this.fields[i] = fields.shift()
            }
        }
    }
    /**
     * removes the last field and returns it
     * @param {boolean} resolve whether or not to resolve the type
     * @returns the last field
     */
    public pop(resolve: boolean = false) {
        let that = this.fields.pop();
        return resolve ? Utils.Types(this.data, [that] as string[]) : that
    }
    /**
     * removes the first field and returns it
     * @param {boolean} resolve whether or not to resolve the type
     * @returns the first field
     */
    public shift(resolve: boolean = false) {
        let that = this.fields.shift().unescape()
        return resolve ? Utils.Types(this.data, [that] as string[]) : that
    }
    /**
     * returns the specified field or, failing that, the first field, if it does not have a value, a default can be assigned
     * @param {number} index the zero-based index
     * @param {any} def the default value
     * @returns field value or default value
     */
    public get(index: number = 0, def: any = null): any {
        return this.data.func.fields?.at(index)?.value ?? def
    }
    /**
     * returns the fields in a resolved form
     * @param {number | undefined} start from where to start
     * @param {number | undefined} end  where end
     * @returns (string | number | bigint | object | RegExp)[]
     */
    public resolve(start: number | undefined = 0, end: number | undefined = this.fields.length): (string | number | bigint | object | RegExp)[] {
        return this.fields = Utils.Types(this.data, this.fields.slice(start, end) as string[])
    }
    /**
     * unsolves the fields
     */
    public async unsolve(start: number | undefined = 0, end: number = this.fields.length) {
        if (this.fields) {
            for (let index = start; index < end; index++) {
                for (let over of this.fields[index].overs) {
                    await this.unsolve(over);
                    this.data.func.fields![index].value = this.data.func.fields![index]?.value?.replaceAll(over.id, over.total)
                    this.data.func.inside = this.data.func.inside!?.replaceAll(over.id, over.total)
                    this.data.func.total = this.data.func.total.replaceAll(over.id, over.total)
                }
            }
        }
    }
    /**
     * returns the fields
     * @param {boolean} unescape if the return be unescaped
     * @param {number | undefined} start from where to start
     * @param {number | undefined} end  where end
     * @returns (string | number | bigint | object | RegExp)[]
     */
    public split(unescape: boolean = true, start: number | undefined = 0, end: number | undefined = this.fields.length): any[] {
        return this.fields.slice(start, end).map(f => {
            return unescape && typeof f === "string" ? f.unescape() : f
        })
    }
};
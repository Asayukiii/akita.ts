import type { FnD } from "./compiler"
import type { Data } from "index"
import { get, set } from "lodash"
import { Utils } from "./utils"
import { Fields } from "./fields"

export class That {
    public data: Data;
    public fields: Fields
    constructor(k: Data, f: Fields) {
        this.data = k
        this.fields = f
    }
    // util
    public get meta() { return this.data.metadata }
    /**
     * send a warning to the console
     * @param {string} msg the warning error
     * @param {boolean} fatal if this warning will be fatal
     * @returns void
     */
    public warn(msg: string, fatal: boolean = false): void {
        Utils.Warn(msg, this.data, fatal)
    }
    /**
     * breaks the code
     * @returns true
     */
    public breakBlock(): true {
        return this.data.break = this.data.break = true
    }
    /**
     * set the new code by replacing the current ID and return an object with the same
     * @param {any} value replacer for the current ID (recommended use strings)
     * @returns \{ code: string }
     */
    public makeReturn(value: any): { code: string } {
        this.data.code = this.data.code.replace(this.id, value)
        return { code: this.data.code }
    }
    /**
     * @param {string} key the variable key
     * @returns unknown
     */
    public variable(key: string): any {
        return get(this.data.metadata.vars, key)
    }
    /**
     * sets value to a variable
     * @param {string} key the variable key
     * @param {any} value the value to set
     * @returns the value
     */
    public setVariable<T>(key: string, value: T): T {
        return set(this.data.metadata.vars, key, value), value

    }
    // function data
    public get id(): string { return this.data.func.id }
    public get inside(): string | null { return this.data.func.inside }
    public set inside(value: string | null) { this.data.func.inside = value }
    /**
     * execute the fields of this function
     * @param {number | undefined} index if this argument is given a numeric value >=0, only that field in question will be resolved
     * @returns Promise\<FnD>
     */
    public resolveFields(index?: number): Promise<FnD> {
        return typeof index === "number"
            ? this.data.func.resolve_field(this.data, index)
            : this.data.func.resolve_fields(this.data)
    }
}
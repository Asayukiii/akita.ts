import { FunctionBuilderData } from "../../index";

export interface Field {
    description?: string
    optional?: boolean
    name: string
    type: string
}
export interface Extra {
    description: string
    returns: string
    example: string
    fields: Field[]
    use: string
}

export class FunctionBuilder {
    public name: string
    public extra: Partial<Extra>
    constructor(data?: FunctionBuilderData) {
        this.name = data?.name || ""
        this.extra = data?.extra || {}
    }
    setName(name: string): FunctionBuilder {
        if (typeof name !== "string") throw new SyntaxError("Invalid name type provided.")
        this.name = "$".concat(name);
        return this
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue<K extends keyof Extra>(key: K, value: K extends "fields" ? Field[] : any): FunctionBuilder {
        if (typeof key !== "string") throw new SyntaxError("Invalid key provided.")
        this.extra[key] = value
        return this
    }
}
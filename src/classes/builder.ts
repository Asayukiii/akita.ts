import { FunctionBuilderData } from "../../index";

export class FunctionBuilder {
    public name: string
    public extra: Record<string, any>
    constructor(data?: FunctionBuilderData) {
        this.name = data?.name || ''
        this.extra = data?.extra || {}
    }
    setName(name: string): FunctionBuilder {
        if(typeof name !== 'string') throw new SyntaxError('Invalid name type provided.')
        this.name = name
        return this
    }
    setValue(key: string, value: any): FunctionBuilder {
        if(typeof key !== 'string') throw new SyntaxError('Invalid key provided.')
        this.extra[key] = value
        return this
    }
}
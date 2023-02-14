import type { Interpreter } from "./src/classes/interpreter";
import type { Compiler, FnD } from "./src/classes/compiler";
import type { Container } from "./src/classes/container";
import { Application, Request, Response } from "express";
import { FunctionBuilder } from "./src/classes/builder";
import type { Context } from "./src/classes/context";
import { AkitaClient } from "src/main";

export type Typeof = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "any";
export type CommandType = "MESSAGE" | "INTERACTION" | "MEMBER_ADD" | "MEMBER_REMOVE"
export type Falsy = false | void | "" | 0 | null | undefined
export type Truthy<T> = T extends Falsy ? never : T;

export interface Command {
    names?: string[]
    type: CommandType
    code: string
}

export interface Metadata extends Record<K, T> {
    yields: Record
    ctn: Container
    ctx: Context
    vars: Record
}

export interface Data {
    interpreter: Interpreter
    client: AkitaClient
    metadata: Metadata
    compiler: Compiler
    break: Falsy | Truthy
    code: string
    func: FnD 
}

export interface FunctionBuilderData {
    name: string,
    extra?: Record<string, any>
}

export interface SourceFunction {
    data: FunctionBuilderData | FunctionBuilder
    code: (data: Data) => Promise<{ code: string } | void>
}

export class Interpreter {
    constructor()
    public functions: SourceFunction[]
    public parse(text: string, req: Request, res: Response, d?: Data): Promise<Data | undefined>
    public addFunction(func: SourceFunction)
    private load(): void
}

export const Utils = {
    /**
     * Sends a warn to the console.
     * @param error The error itself.
     * @param data The source.
     */
    Warn(error: string, data: string): void;,
    /**
     * Checks if this string/number is a valid number resolvable.
     * @param num The text to check if its a number.
     */
    isNumber(num: string): boolean;,
    /**
     * Convert a string to boolean.
     * @param str The string to validate as boolean.
     */
    booleanify(str: string): boolean;,
    /**
     * Resolve a condition inside a string.
     * @param condition The string conditional.
     */
    condition(condition: string): boolean | null;
}

export default { FunctionBuilder, Utils, AkitaClient }

declare global {
    interface String {
        replaceLast(pattern: string | RegExp, replacer?: string): string
        asyncReplace(pattern: any, replacer?: any): Promise<string>
        replace(searchValue: string | RegExp, replaceValue: any)
        unescape(): string 
        escape(): string
    }
}
import { Application, Request, Response } from "express"
import { TypedEmitter } from "tiny-typed-emitter";
import { FunctionBuilder } from "./src/classes/builder";

export interface ConstructorOptions {
    port: number
}

export interface Events {
    ready: (app: Application) => void;
    error: (app: Application) => void;
}

export interface Route {
    path: string
    details?: Record<string, any>
    code: string
}

export interface Data {
    app: Application
    code: string
    func: string
    req: Request
    res: Response
    break: boolean
    unpack: (d: Data) => UnpackedFunction
    _: Record<string, any>
    routes: Endpoints
}

export interface UnpackedFunction {
    name: string
    inside: string | null
    splits: string[] | []
}

export interface FunctionBuilderData {
    name: string,
    extra?: Record<string, any>
}

export interface SourceFunction {
    data: FunctionBuilderData | FunctionBuilder
    code: (data: Data) =>  Promise<{ code: string } | void>
}

export class Interpreter {
    constructor(app: Application)
    public functions: SourceFunction[]
    public app: Application
    private unpack(d: Data): UnpackedFunction
    public parse(text: string): string
    public addFunction(func: SourceFunction)
    private load(): void
}

export class Endpoints {
    constructor(app: Application)
    public app: Application
    public routes: Route[]
    public getRoutes(): Route[]
    /**
     * Add a route to the API.
     * @param route The route data.
     */
    public add(route: Route): void
    /**
     * Load a routes directory (Handler)
     * @param dir The directory path
     * @example
     * <API>.routes.load('./routes')
     */
    public load(dir: string): void
}

export class API extends TypedEmitter<Events> {
    public app: Application
    public interpreter: Interpreter
    constructor(options: ConstructorOptions)
    /**
     * Set the spaces in the objects.
     * @param howmany The number of breaklines in the JSON objects.
     */
    public setSpaces(howmany: number): void;
    /**
     * Starts the API.
     */
    public connect(): void
}

declare global {
    interface String {
        /**
         * Replace last argument from a string.
         */
        resolve(What: string, Replacement: string): string
        after(): string | null
    }
}
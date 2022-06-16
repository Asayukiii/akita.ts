import { ConstructorOptions, Events } from "../../index";
import { TypedEmitter } from "tiny-typed-emitter"
import express, { Application } from "express";
import { Endpoints } from "./routes"
import { Interpreter } from "./interpreter";
import { Utils } from "./utils";

export class API extends TypedEmitter<Events> {
    public port: number
    public app: Application
    public routes: Endpoints
    public interpreter: Interpreter
    constructor(options: ConstructorOptions) {
        super()
        this.port = options.port
        this.app = express()
        this.routes = new Endpoints(this.app)
        this.interpreter = new Interpreter(this.app, this.routes)
    }
    setSpaces(howm: number): void {
        let n = Number(howm)
        if(isNaN(n) || 0 >= n || n >= 10) Utils.Warn('Invalid spaces number provided in:', '<API>.setSpaces()')
        this.app.set('json spaces', n)
    }
    connect(): void {
        let routes = this.routes.getRoutes()
        for(const route of routes) {
            this.app.get(route.path, (req, res) => {
                this.interpreter.parse(route.code, req, res).catch(e => {
                    this.emit('error', e)
                })
            })
        }
        this.app.listen(this.port, () => {
            this.emit('ready', this.app)
        })
    }
}
import { ConstructorOptions, Events } from "../../index";
import { TypedEmitter } from "tiny-typed-emitter"
import express, { Application } from "express";
import { Endpoints } from "./routes";
import { Interpreter } from "./interpreter";
import { Utils } from "./utils";

export class API extends TypedEmitter<Events> {
    public port: number
    public db: any
    public app: Application
    public routes: Endpoints
    public interpreter: Interpreter
    constructor(options: ConstructorOptions) {
        super()
        let db;
        if(options.database?.type?.toLowerCase() === 'mongo') {
            if(options.database?.enabled) {
                const { Database } = require('quickmongo')
                if(!options.database?.mongoUrl) throw new Error('Invalid MONGO_URL provided in database options.')
                db = new Database(options.database.mongoUrl)
                db.connect()
            }
        } else if(options.database?.type?.toLowerCase() === 'replit') {
            if(options.database?.enabled) {
                const ReplitDb = require('@replit/database')
                db = new ReplitDb()
            }
        } else if(options.database?.type?.toLowerCase() === 'quickdb') {
            if(options.database?.enabled) {
                const { QuickDB } = require('quick.db')
                db = new QuickDB()
            }
        } else if(options.database?.type?.toLowerCase() === 'default' || !options.database?.type) {
            if(options.database?.enabled) {
                const { Database } = require('midb')
                db = new Database()
            }
        }
        if(options.spaces && isNaN(options.spaces) || options.spaces && (options.spaces >= 10 || 0 >= options.spaces)) throw new SyntaxError('Invalid spaces number provided in constructor.')
        this.db = db
        this.port = options.port
        this.app = express()
        this.routes = new Endpoints(this.app)
        this.interpreter = new Interpreter(this.app, this.routes, this.db)
        this.app.set('json spaces', options.spaces || 1)
    }
    /**
     * 
     * @deprecated Use constructor object instead
     */
    setSpaces(howm: number): void {
        let n = Number(howm)
        if(isNaN(n) || 0 >= n || n >= 10) Utils.Warn('Invalid spaces number provided in:', '<API>.setSpaces()')
        this.app.set('json spaces', n)
    }
    set404(code: string): void {
        this.on('ready', () => {
            this.app.all('*', (req, res) => {
                this.interpreter.parse(code, req, res).catch(e => {
                    this.emit('error', e)
                })
            })
        })
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
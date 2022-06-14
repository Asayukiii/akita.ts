import { Application } from "express";
import { lstatSync, readdirSync } from "fs";
import { join } from "path";
import { Route } from "../../index";
import { Utils } from "./utils";

export class Endpoints {
    public app: Application
    public routes: Route[]
    constructor(app: Application) {
        this.app = app
        this.routes = []
    }
    getRoutes(): Route[] {
        return this.routes
    }
    add(route: Route): void {
        if(!route) throw new SyntaxError('Invalid route data provided.')
        if(!route.path || typeof route.path !== 'string') throw new SyntaxError('Invalid path route provided.')
        if(!route.code || typeof route.path !== 'string') throw new SyntaxError('Invalid call string provided.')
        if(route.details && typeof route.details !== 'object') throw new SyntaxError('Invalid extra object provided.')

        this.routes[this.routes.length] = route
    }
    async loadWithCache(dir: string): Promise<void> {
        let mdir = process.cwd()
        let modules = readdirSync(join(mdir, dir))
        for(const file of modules) {
            let stat = lstatSync(join(mdir, dir, file))
            if(stat.isDirectory()) { this.loadWithCache(join(dir, file)); continue }
            let route = require(join(mdir, dir, file))
            route = !route?.path && route?.default?.path ? route.default: route
            if(!route?.path || !route?.code) { Utils.Warn('Invalid route at:', join(dir, file)); continue }
            this.add(route)
        }
    }
    async load(dir: string): Promise<void> {
        if(!dir || typeof dir !== 'string') throw new SyntaxError('Invalid path provided.')
        this.loadWithCache(dir).catch((e) => {
            Utils.Warn(`Failed to load path with reason: ${e}. at:`, `load(${dir})`)
        })
    }
}
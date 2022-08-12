import { Application } from "express";
import { lstatSync, readdirSync } from "fs";
import { join } from "path";
import { Route } from "../../index";
import { Utils } from "./utils";
import colors from "colors/safe"
import { API } from "./api";

interface Debugged {
    path: string
    loaded: string
    route?: string
}

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
    private async loadWithCache(dir: string, arr: Debugged[]): Promise<void> {
        let mdir = process.cwd()
        let modules = readdirSync(join(mdir, dir))
        for(const file of modules) {
            let stat = lstatSync(join(mdir, dir, file))
            if(stat.isDirectory()) { this.loadWithCache(join(dir, file), arr); continue }
            try {
                let route = require(join(mdir, dir, file))
                route = !route?.path && route?.default?.path ? route.default: route
                if(!route?.path || !route?.code) { arr.push({path: join(mdir, dir, file), loaded: colors.red('Failed'), route: route?.path}); continue }
                this.add(route)
                arr.push({path: join(mdir, dir, file), loaded: colors.green('Loaded'), route: route.path})
            } catch(e) {
                console.log(e)
                arr.push({path: join(mdir, dir, file), loaded: colors.red('Failed')})
            }
        }
    }
    async load(dir: string): Promise<void> {
        if(!dir || typeof dir !== 'string') throw new SyntaxError('Invalid path provided.')
        let arr: Debugged[] = []
        let line = '| ----------------------------------------------------- |'
        this.loadWithCache(dir, arr).then(() => {
            // @ts-ignore
            arr = arr.map(i => `| ${colors.grey(i.path)}\n| ${i.loaded} [${colors.cyan(i.route || 'Unknown route')}]\n${line}`)
            console.log(line)
            for(const i of arr) { console.log(i) }
        }).catch((e) => {
            Utils.Warn(`Failed to load path with reason: ${e}. at:`, `load(${dir})`)
        })
    }
}
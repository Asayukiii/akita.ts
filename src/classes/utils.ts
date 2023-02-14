// @ts-ignore
import { Data, Falsy } from "../../index"
import { Guild, GuildMember, User } from "discord.js";
import _, { noop, filter } from "lodash";
import Hjson from "hjson";
import fs from "fs";
import "colors";
import { That } from "./data";

var equal = (str: string) => str.split('==')[0] == str.split('==')[1],
    not_equal = (str: string) => str.split('!=')[0] != str.split('!=')[1],
    major = (str: string) => Number(str.split('>')[0]) > Number(str.split('>')[1]),
    minor = (str: string) => Number(str.split('<')[0]) < Number(str.split('<')[1]),
    m_e = (str: string) => Number(str.split('>=')[0]) >= Number(str.split('>=')[1]),
    mi_e = (str: string) => Number(str.split('<=')[0]) <= Number(str.split('<=')[1]),
    s = 1000,
    m = s * 60,
    h = m * 60,
    d = h * 24,
    w = d * 7,
    mo = d * 30,
    y = d * 365,
    dObject = { s, m, h, d, w, mo, y };

export const Utils = {
    falsys: ["no", "0", "null", "", "void", "none", "undefined", "false"],
    async LoadFiles(o: string, i: string): Promise<fs.Dirent[]> { 
        if (i !== "") i += "/" + o;
        else i = o;
        var e = fs.readdirSync(i, { withFileTypes: !0 }).map((e: fs.Dirent) => (e.name = `${i}/${e.name}`, e)),
            r = filter(e, (e => e.isFile() && e.name.endsWith(".js"))),
            n = filter(e, (e => e.isDirectory()));
        for (var a of n) r.push(...(await this.LoadFiles(a.name, "")));
        return r;
    },
    async Invoke(data: That, field: string, args: string[] | undefined, object: any) {
        let result: any, spl = field.slice(7).split("->"),
            fn = spl.shift() as string,
            save = spl.join("->").split(",");
        if (!_.hasIn(object, fn)) return this.Warn("Invalid function key provided", data.data, true);
        result = await _.invoke(object, fn, ...this.Types(data.data, args || []));
        if (spl.length) {
            if (save.length == 1) _.set(data.data.metadata.vars, save[0], result);
            else {
                if (!result[Symbol.iterator]) return Utils.Warn("Return value was not iterable", data.data, true);
                let iter = result[Symbol.iterator]() as IterableIterator<any>;
                this.Iterate(iter, async (e, i) => {
                    if (save[i].startsWith("...")) {
                        await _.set(data.data.metadata.vars, save[i].slice(3), result?.slice(i));
                        return true;
                    };
                    await _.set(data.data.metadata.vars, save[i], e);
                });
            };
        };
        return result;
    },
    SyncIterate<T>(iterator: IterableIterator<T>, cb: (value: T) => any) {
        let item: IteratorResult<T, any>;
        while (item = iterator.next()) {
            if (item.done) break;
            cb(item.value);
        };
    },
    async Iterate<T>(iterator: IterableIterator<T>, cb: (value: T, index: number, iter: IterableIterator<T>) => any) {
        let item: IteratorResult<T, any>, index = 0;
        while (item = iterator.next()) {
            if (item.done) break;
            await cb(item.value, index++, iterator);
        };
    },
    Types(d: Data, items: string[]): (string | number | bigint | RegExp | object)[] {
        return items.map((item) => {
            let type = "unknown";
            if (/(string|unknown|number|bigint|regexp|json):(.*?)/g.test(item)) {
                let spt = (item as string).split(":");
                type = spt[0], item = spt.slice(1).join(":");
            };
            if (type == "string") return item;
            if (!isNaN(item as any) && "string" != type && "bigint" != type) return Number(item);
            if (!isNaN(item as any) && "string" != type && "number" != type) BigInt(item);
            if (["unknown", "regexp"].includes(type) && /\/(.*?)\/(.+|)/g.test(item)) {
                let splitted = item.split("/");
                return new RegExp(splitted[1], splitted[2]);
            } else
                try {
                    return Hjson.parse(item);
                } catch (e) {
                    if (type == "json") return Utils.Warn("Invalid JSON provided", d, true) as undefined;
                    return String(item);
                };
        });
    },
    Warn(error: string, d: Data, fatal: boolean = false): void {
        d.code &&= d.code.replace(d.func.id, " ");
        if (fatal) {
            console.error(`${"ERROR".bgRed} ;; ${error.gray} in ${d.func.total.trim().bgRed}`.gray);
            d.break = true;
        } else console.log(`${"WARN".bgYellow} ;; ${error.gray} in ${d.func.total.trim().bgYellow}`.gray);
    },
    booleanify(str: string): boolean {
        let nyumber = Number(str);
        return isNaN(nyumber) ? nyumber > 0 : !this.falsys.includes(str?.toLowerCase());
    },
    condition<T = null>(condition: string): boolean | null {
        try {
            let ands = condition.split('&&')
            let results: any = []
            for (const and of ands) {
                if (and.includes('||')) results = or(and)
                else if (and.includes('==')) results.push(equal(and))
                else if (and.includes('!=')) results.push(not_equal(and))
                else if (and.includes('>=')) results.push(m_e(and))
                else if (and.includes('<=')) results.push(mi_e(and))
                else if (and.includes('>')) results.push(major(and))
                else if (and.includes('<')) results.push(minor(and))
                else results.push(this.booleanify(and));
            }
            if (results === null) return null;
            results = condition.includes('||') ? results : eval(results.join('&&'));
            return typeof results == "string"
                ? !this.falsys.includes(results) : Boolean(results);
        } catch {
            return null
        }
    },
    Object(json: string): Record<string, any> | null {
        try {
            let r = Hjson.parse(json)
            return typeof r === 'object' ? r : null
        } catch {
            return null
        }
    },
    ValidateHex(str: string): boolean {
        return !!str && /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(str.replace(/(#)/g, ''))
    },
    TimeToMS(str: string): number {
        str = str.toLowerCase().replace(/ +/g, "");
        let $ = Array.from(str.matchAll(/(\d+\.\d+|\d+)(ms|s|mo|d|h|w|m|y)/g)), final = 0;
        if ($) {
            for (let t of $) {
                final += t[2] == "ms" ? Number(t[1]) : Number(t[1]) * dObject[t[2]];
            };
            return final;
        } else return this.Warn("Invalid time gived", { func: { total: str } } as any, false), 0;
    },
    async findUser(d: That, resolvable: string, flags?: string): Promise<User | void> {
        resolvable = resolvable.toLowerCase().trim();
        if (resolvable === '') return;
        let resolvedId = this.resolveSnowflake(resolvable) as string;
        if (this.isSnowflake(resolvedId)) {
            return await d.data.client.users.fetch(resolvedId).catch(_.noop);
        };
        let reg = new RegExp(resolvable, flags ?? 'gi');
        return d.data.client.users.cache.find((user: User) => {
            return resolvedId === user.id ||
                resolvable === user.toString() ||
                resolvable === user.username.toLowerCase() ||
                resolvable === user.tag.toLowerCase() ||
                reg.test(user.tag);
        });
    },
    async findMember(guild: Guild, resolvable: string, flags?: string): Promise<GuildMember | void> {
        resolvable = resolvable.toLowerCase().trim();
        if (resolvable === '') return;
        let resolvedId = this.resolveSnowflake(resolvable) as string;
        if (this.isSnowflake(resolvedId)) {
            return await guild.members.fetch(resolvedId).catch(_.noop);
        };
        let reg = new RegExp(resolvable, flags ?? 'gi');
        return guild.members.cache.find((member: GuildMember) => {
            return resolvedId === member.id ||
                resolvable === member.toString() ||
                resolvable === member.displayName ||
                resolvable === member.user.username ||
                resolvable === member.user.tag ||
                resolvable === member.nickname ||
                reg.test(member.displayName) ||
                reg.test(member.user.username) ||
                reg.test(member.user.tag) ||
                reg.test(member.nickname!)
        });
    },
    resolveSnowflake(resolvable: string): string | boolean {
        resolvable = resolvable.replace(/[&#@!:<>]/gim, '');
        return !!Number(resolvable) && resolvable;
    },
    isSnowflake(resolvable: string | number | boolean): boolean {
        const typeof_0 = typeof resolvable;
        if (!['number', 'string'].includes(typeof_0) || isNaN(resolvable as number))
            return false;
        typeof_0 === 'number' && (resolvable = resolvable.toString());
        return /\d{17,20}/.test(resolvable as string);
    }
}

function or(str: string): boolean | null {
    try {
        let ors = str.split('||')
        let results: any[] = []
        for (const or of ors) {
            if (or.includes('==')) results.push(equal(or))
            else if (or.includes('!=')) results.push(not_equal(or))
            else if (or.includes('>=')) results.push(m_e(or))
            else if (or.includes('<=')) results.push(mi_e(or))
            else if (or.includes('>')) results.push(major(or))
            else if (or.includes('<')) results.push(minor(or))
            else results.push(or);
        }
        return results.some(Boolean)
    } catch {
        return null
    }
}

// Number symbols
export const symbols: string[] = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "O", "N", "D", "UD", "UD", "DD", "TD", "QaD", "QiD", "SxD", "SpD", "OD", "ND", "V", "UV", "DV", "TV", "QaV", "QiV", "SxV", "SpV", "OV", "NV", "DT", "UDT", "DDT", "TDT", "QaDT", "QiDT", "SxDT", "SpDT", "ODT", "NDT", "DQa", "UDQa", "DDQa", "TDQa", "QaDQa", "QiDQa", "SxDQa", "SpDQa", "ODQa", "NDQa", "DQi", "UDQi", "DDQi", "TDQi", "QaDQi", "QiDQi", "SxDQi", "SpDQi", "ODQi", "NDQi", "DSx", "UDSx", "DDSx", "TDSx", "QaDSx", "QiDSx", "SxDSx", "SpDSx", "ODSx", "NDSx", "DSp", "UDSp", "DDSp", "TDSp", "QaDSp", "QiDSp", "SxDSp", "SpDSp", "ODSp", "NDSp", "DO", "UDO", "DDO", "TDO", "QaDO", "QiDO", "SxDO", "SpDO", "ODO", "NDO", "DN", "UDN", "DDN", "TDN", "QaDN", "QiDN", "SxDN", "SpDN", "ODN", "NDN", "C", "UC"]
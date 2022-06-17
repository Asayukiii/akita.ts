import colors from "colors/safe"

const equal = (str: string) => str.split('==')[0] == str.split('==')[1]
const not_equal = (str: string) => str.split('!=')[0] != str.split('!=')[1]
const major = (str: string) => Number(str.split('>')[0]) > Number(str.split('>')[1])
const minor = (str: string) => Number(str.split('>')[0]) < Number(str.split('>')[1])
const m_e = (str: string) => Number(str.split('>')[0]) >= Number(str.split('>')[1])
const mi_e = (str: string) => Number(str.split('>')[0]) <= Number(str.split('>')[1])

export const Utils = {
    Warn(error: string, data: string): void {
        console.log(`${colors.yellow(">> WARNING!!")} ${colors.red(error)} ${colors.cyan(data)}`)
    },
    isNumber(num: string): boolean {
        let n = num.match(/[0-9]/g)
        return n ? true: false
    },
    booleanify(str: string): boolean {
        let r;
        str = str.toLowerCase()
        if(str === 'yes' || str === 'true') r = true
        if(str === 'no' || str === 'false') r = false
        return r || true
    },
    condition(condition: string): boolean | null {
        try{
            let ands = condition.split('&&')
            let results: any = []
            for(const and of ands) {
                if(and.includes('||')) results = or(and)
                else if(and.includes('==')) results.push(equal(and))
                else if(and.includes('!=')) results.push(not_equal(and))
                else if(and.includes('>')) results.push(major(and))
                else if(and.includes('<')) results.push(minor(and))
                else results.push(and);
            }
            if(results === null) return null
            return condition.includes('||') ? results: eval(results.join('&&'))
        } catch {
            return null
        }
    },
    isValidJSON(json: string): boolean {
        try {
            return JSON.parse(json) ? true: false
        } catch {
            return false
        }
    }
}

function or(str: string): boolean | null {
    try{
        let ors = str.split('||')
        let results = []
        for(const or of ors) {
            if(or.includes('==')) results.push(equal(or))
            else if(or.includes('!=')) results.push(not_equal(or))
            else if(or.includes('>')) results.push(major(or))
            else if(or.includes('<')) results.push(minor(or))
            else if(or.includes('>=')) results.push(m_e(or))
            else if(or.includes('<=')) results.push(mi_e(or))
            else results.push(or);
        }
        return results.some(Boolean)
    } catch {
        return null
    }
}
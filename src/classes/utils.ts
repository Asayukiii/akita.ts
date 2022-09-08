import { SKRSContext2D } from "@napi-rs/canvas"
import colors from "colors/safe"
import Hjson from "hjson"

const equal = (str: string) => str.split('==')[0] == str.split('==')[1]
const not_equal = (str: string) => str.split('!=')[0] != str.split('!=')[1]
const major = (str: string) => Number(str.split('>')[0]) > Number(str.split('>')[1])
const minor = (str: string) => Number(str.split('<')[0]) < Number(str.split('<')[1])
const m_e = (str: string) => Number(str.split('>=')[0]) >= Number(str.split('>=')[1])
const mi_e = (str: string) => Number(str.split('<=')[0]) <= Number(str.split('<=')[1])

export const Utils = {
    Warn(error: string, data: string): void {
        console.log(`${colors.yellow("[ WARNING ]")} ${colors.red(error)} ${colors.cyan(data)}`)
    },
    isNumber(num: string): boolean {
        return num.replace(/^-?\d*\.?\d+$/g, '') ? false: true
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
                else if(and.includes('>=')) results.push(m_e(and))
                else if(and.includes('<=')) results.push(mi_e(and))
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
    loadObject(json: string): Record<string, any> | null {
        try {
            let r = Hjson.parse(json)
            return typeof r === 'object' ? r: null
        } catch {
            return null
        }
    },
    isValidHex(str: string): boolean {
        if(!str) return false
        return /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(str.replace(/(#)/g, ''))
    },
    molde(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, radius: number): void {
        ctx.beginPath()
		ctx.moveTo(x + radius, y)
		ctx.lineTo(x + width - radius, y)
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
		ctx.lineTo(x + width, y + height - radius)
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
		ctx.lineTo(x + radius, y + height)
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
		ctx.lineTo(x, y + radius)
		ctx.quadraticCurveTo(x, y, x + radius, y)
		ctx.closePath()
    }
}

function or(str: string): boolean | null {
    try{
        let ors = str.split('||')
        let results = []
        for(const or of ors) {
            if(or.includes('==')) results.push(equal(or))
            else if(or.includes('!=')) results.push(not_equal(or))
            else if(or.includes('>=')) results.push(m_e(or))
            else if(or.includes('<=')) results.push(mi_e(or))
            else if(or.includes('>')) results.push(major(or))
            else if(or.includes('<')) results.push(minor(or))
            else results.push(or);
        }
        return results.some(Boolean)
    } catch {
        return null
    }
}

export function getTextHeight(ctx: SKRSContext2D, text: string, style: string): number {
    const previousTextBaseline = ctx.textBaseline
    const previousFont = ctx.font

    ctx.textBaseline = 'bottom'
    ctx.font = style
    const { actualBoundingBoxAscent: height1, actualBoundingBoxDescent: height2 } = ctx.measureText(text)

    // Reset baseline
    ctx.textBaseline = previousTextBaseline
    ctx.font = previousFont
    return height1 + height2 + 1.7
  }

//Number symbols
export const symbols: Array<String> = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "O", "N", "D", "UD", "UD", "DD", "TD", "QaD", "QiD", "SxD", "SpD", "OD", "ND", "V", "UV", "DV", "TV", "QaV", "QiV", "SxV", "SpV", "OV", "NV", "DT", "UDT", "DDT", "TDT", "QaDT", "QiDT", "SxDT", "SpDT", "ODT", "NDT", "DQa", "UDQa", "DDQa", "TDQa", "QaDQa", "QiDQa", "SxDQa", "SpDQa", "ODQa", "NDQa", "DQi", "UDQi", "DDQi", "TDQi", "QaDQi", "QiDQi", "SxDQi", "SpDQi", "ODQi", "NDQi", "DSx", "UDSx", "DDSx", "TDSx", "QaDSx", "QiDSx", "SxDSx", "SpDSx", "ODSx", "NDSx", "DSp", "UDSp", "DDSp", "TDSp", "QaDSp", "QiDSp", "SxDSp", "SpDSp", "ODSp", "NDSp", "DO", "UDO", "DDO", "TDO", "QaDO", "QiDO", "SxDO", "SpDO", "ODO", "NDO", "DN", "UDN", "DDN", "TDN", "QaDN", "QiDN", "SxDN", "SpDN", "ODN", "NDN", "C", "UC"]
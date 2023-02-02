"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.symbols=exports.Utils=void 0;const tslib_1=require("tslib"),lodash_1=tslib_1.__importDefault(require("lodash")),hjson_1=tslib_1.__importDefault(require("hjson"));require("colors");var equal=e=>e.split("==")[0]==e.split("==")[1],not_equal=e=>e.split("!=")[0]!=e.split("!=")[1],major=e=>Number(e.split(">")[0])>Number(e.split(">")[1]),minor=e=>Number(e.split("<")[0])<Number(e.split("<")[1]),m_e=e=>Number(e.split(">=")[0])>=Number(e.split(">=")[1]),mi_e=e=>Number(e.split("<=")[0])<=Number(e.split("<=")[1]),s=1e3,m=60*s,h=60*m,d=24*h,w=7*d,mo=30*d,y=365*d,dObject={s:s,m:m,h:h,d:d,w:w,mo:mo,y:y};function or(e){try{var t=e.split("||"),s=[];for(const r of t)r.includes("==")?s.push(equal(r)):r.includes("!=")?s.push(not_equal(r)):r.includes(">=")?s.push(m_e(r)):r.includes("<=")?s.push(mi_e(r)):r.includes(">")?s.push(major(r)):r.includes("<")?s.push(minor(r)):s.push(r);return s.some(Boolean)}catch{return null}}exports.Utils={falsys:["no","0","null","","void","none","undefined","false"],async Invoke(s,e,t,r){let n,i=e.slice(7).split("->"),a=i.shift(),l=i.join("->").split(",");if(!lodash_1.default.hasIn(r,a))return this.Warn("Invalid function key provided",s,!0);if(n=await lodash_1.default.invoke(r,a,...this.Types(s,t||[])),i.length)if(1==l.length)lodash_1.default.set(s.metadata.vars,l[0],n);else{if(!n[Symbol.iterator])return exports.Utils.Warn("Return value was not iterable",s,!0);e=n[Symbol.iterator](),this.Iterate(e,async(e,t)=>{if(l[t].startsWith("..."))return await lodash_1.default.set(s.metadata.vars,l[t].slice(3),n?.slice(t)),!0;await lodash_1.default.set(s.metadata.vars,l[t],e)})}return n},SyncIterate(e,t){for(var s;(s=e.next())&&!s.done;)t(s.value)},async Iterate(e,t){let s,r=0;for(;(s=e.next())&&!s.done;)await t(s.value,r++,e)},Types(r,e){return e.map(e=>{let t="unknown";var s;if(/(string|unknown|number|bigint|regexp|json):(.*?)/g.test(e)&&(s=e.split(":"),t=s[0],e=s.slice(1).join(":")),"string"==t)return e;if(!isNaN(e)&&"string"!=t&&"bigint"!=t)return Number(e);if(isNaN(e)||"string"==t||"number"==t||BigInt(e),["unknown","regexp"].includes(t)&&/\/(.*?)\/(.+|)/g.test(e))return s=e.split("/"),new RegExp(s[1],s[2]);try{return hjson_1.default.parse(e)}catch(s){return"json"==t?exports.Utils.Warn("Invalid JSON provided",r,!0):String(e)}})},Warn(e,t,s=!1){t.code&&=t.code.replace(t.func.id," "),s?(console.error((`${"ERROR".bgRed} ;; ${e.gray} in `+t.func.total.trim().bgRed).gray),t.break=!0):console.log((`${"WARN".bgYellow} ;; ${e.gray} in `+t.func.total.trim().bgYellow).gray)},booleanify(e){var t=Number(e);return isNaN(t)?0<t:!this.falsys.includes(e?.toLowerCase())},condition(condition){try{let ands=condition.split("&&"),results=[];for(const and of ands)and.includes("||")?results=or(and):and.includes("==")?results.push(equal(and)):and.includes("!=")?results.push(not_equal(and)):and.includes(">=")?results.push(m_e(and)):and.includes("<=")?results.push(mi_e(and)):and.includes(">")?results.push(major(and)):and.includes("<")?results.push(minor(and)):results.push(this.booleanify(and));return null===results?null:(results=condition.includes("||")?results:eval(results.join("&&")),"string"==typeof results?!this.falsys.includes(results):Boolean(results))}catch{return null}},Object(e){try{var t=hjson_1.default.parse(e);return"object"==typeof t?t:null}catch{return null}},ValidateHex(e){return!!e&&/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e.replace(/(#)/g,""))},TimeToMS(e){e=e.toLowerCase().replace(/ +/g,"");let t=Array.from(e.matchAll(/(\d+\.\d+|\d+)(ms|s|mo|d|h|w|m|y)/g)),s=0;if(t){for(var r of t)s+="ms"==r[2]?Number(r[1]):Number(r[1])*dObject[r[2]];return s}return this.Warn("Invalid time gived",{func:{total:e}},!1),0},async findUser(e,r,n){if(""!==(r=r.toLowerCase().trim())){let t=this.resolveSnowflake(r);if(this.isSnowflake(t))return e.client.users.fetch(t).catch(lodash_1.default.noop);let s=new RegExp(r,n??"gi");return e.client.users.cache.find(e=>t===e.id||r===e.toString()||[e.username.toLowerCase(),e.tag.toLowerCase()].includes(r)||s.test(e.tag))}},resolveSnowflake(e){return e=e.replace(/[&#@!:<>]/gim,""),!!Number(e)&&e},isSnowflake(e){var t=typeof e;return!(!["number","string"].includes(t)||isNaN(e))&&("number"==t&&(e=e.toString()),/\d{17,20}/.test(e))}},exports.symbols=["K","M","B","T","Qa","Qi","Sx","Sp","O","N","D","UD","UD","DD","TD","QaD","QiD","SxD","SpD","OD","ND","V","UV","DV","TV","QaV","QiV","SxV","SpV","OV","NV","DT","UDT","DDT","TDT","QaDT","QiDT","SxDT","SpDT","ODT","NDT","DQa","UDQa","DDQa","TDQa","QaDQa","QiDQa","SxDQa","SpDQa","ODQa","NDQa","DQi","UDQi","DDQi","TDQi","QaDQi","QiDQi","SxDQi","SpDQi","ODQi","NDQi","DSx","UDSx","DDSx","TDSx","QaDSx","QiDSx","SxDSx","SpDSx","ODSx","NDSx","DSp","UDSp","DDSp","TDSp","QaDSp","QiDSp","SxDSp","SpDSp","ODSp","NDSp","DO","UDO","DDO","TDO","QaDO","QiDO","SxDO","SpDO","ODO","NDO","DN","UDN","DDN","TDN","QaDN","QiDN","SxDN","SpDN","ODN","NDN","C","UC"];
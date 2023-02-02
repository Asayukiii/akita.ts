"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.data=void 0;const tslib_1=require("tslib"),builder_1=require("../../classes/builder"),utils_1=require("../../classes/utils"),util_1=require("util"),lodash_1=tslib_1.__importDefault(require("lodash")),hjson_1=tslib_1.__importDefault(require("hjson"));exports.data={data:(new builder_1.FunctionBuilder).setName("var").setValue("description","add or get a variable").setValue("use","$var[key;value?;type?]").setValue("fields",[{name:"key",description:"property to get/set",type:"string"},{name:"value",description:"the value to be given to the variable",type:"any"},{name:"type",description:"the variable force type `(default: unknown)`",type:'"unknown" | "string" | "number" | "bigint" | "regexp" | "json"'}]).setValue("example",'$var[str;hi, im a string] // string var\n$var[num;4] // number var\n$var[obj;{ "leif": "erikson" }] // object var').setValue("returns","String"),code:async e=>{await e.func.resolve_fields(e);let t=e.interpreter.fields(e),[i,r,s="unknown"]=t;if(i.startsWith("invoke:"))return r=await utils_1.Utils.Invoke(e,i,t.slice(1),e.metadata.vars),{code:e.code?.replace(e.func.id,r)};if(r){if("number"==(s=s.toLowerCase())||"string"!=s&&"bigint"!=s&&!isNaN(r))r=Number(r);else if("bigint"==s||"string"!=s&&"number"!=s&&!isNaN(r))r=BigInt(r);else if("regexp"==s||"string"!=s&&["unknown","regexp"].includes(s)&&/\/(.*?)\/(.+|)/g.test(r)){var a=r.split("/");r=new RegExp(a[1],a[2])}else if(["json","unknown"].includes(s))try{r=hjson_1.default.parse(r)}catch(t){if("json"==s)return utils_1.Utils.Warn("Invalid JSON provided",e,!0)}lodash_1.default.set(e.metadata.vars,i,r)}return a=lodash_1.default.get(e.metadata.vars,i,"undefined"),{code:e.code?.replace(e.func.id,"string"==typeof a?a:(0,util_1.inspect)(a,{depth:1/0}))}}};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Compiler=void 0,String.prototype.replaceLast=function(e,t){var s;return(e="string"==typeof e?e:(this.match(e)||[]).slice(-1)[0])&&-1!==(s=this.lastIndexOf(e))?""+this.slice(0,s)+t+this.slice(s+e.length):this};class Compiler{_matched=null;matched=null;functions=new Array;regex=null;result="";code;constructor(e){this.code=e}set_functions(e){return e=e.sort((e,t)=>t.length-e.length),this.functions=e,this.regex=new RegExp(`(${e.map(e=>e.replace("$","\\$")).join("|")})`,"g"),this}set_code(e){return this.code=e}match(){if(this.regex&&this.code){let a={},d=this.code,i=(Array.from(this.code.matchAll(this.regex)).reverse()?.map((i,l)=>{var r=d.split(i[0]).slice(-1).join(""),l="FUNCTION_"+l;if(r.startsWith("[")){let e="",t=0,s;for(var o of r.slice(1)){if("]"==o&&t<=0)break;"["==o?(e+=o,t++):"]"==o&&0<t?(e+=o,t--):e+=o}s=`${i[0]}[${e}]`,a[l]={resolve_fields:()=>{},resolve_field:()=>{},fields:e.split(";").map(e=>({value:e.trim(),overs:[]})),name:i[0],inside:e,total:s,id:l},d=d.replaceLast(s,l)}else a[l]={resolve_fields:()=>{},resolve_field:()=>{},fields:null,inside:null,total:i[0],name:i[0],id:l},d=d.replaceLast(i[0],l)}),this._matched=a),e=Object.values(a);return e.forEach(s=>{if(s.inside&&s.fields)return e.some(e=>e.fields?.some(e=>e.overs.some(e=>e.id==s.id)))?delete a[s.id]:void s.fields.forEach((e,t)=>{e.value.match(/FUNCTION_\d+/g)?.forEach(e=>{i[e]&&(a[s.id].fields[t].overs.push(i[e]),delete a[e])})})}),this.result=d,this.matched=a}}}exports.Compiler=Compiler;
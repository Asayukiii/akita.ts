"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.data=void 0;const tslib_1=require("tslib"),builder_1=require("../../classes/builder"),lodash_1=require("lodash"),colors_1=tslib_1.__importDefault(require("colors"));let reg=/{(.*?)}/g;exports.data={data:(new builder_1.FunctionBuilder).setName("log").setValue("description","log something in console").setValue("use","$log[message]").setValue("fields",[{name:"message",type:"string",optional:!0}]).setValue("example","$log[{red:wuuuujuuuuuuuuuuuuuuu} {gray:chchchachchchch}]").setValue("returns","Void"),code:async function(){await this.resolveFields();let e=this.inside.unescape(),s=Array.from(e.matchAll(reg)).reverse();if(0<s.length)for(var[l,r]of s){var[r,...t]=r.split(":");(0,lodash_1.has)(colors_1.default,r)&&(r=(0,lodash_1.invoke)(colors_1.default,r,t.join(":"))+colors_1.default.reset(""),e=e.replaceLast(l,r))}return console.log(e),this.makeReturn("")}};
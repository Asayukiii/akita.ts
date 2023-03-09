"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.data=void 0;const tslib_1=require("tslib"),builder_1=require("../../classes/builder"),lodash_1=tslib_1.__importDefault(require("lodash"));var LR;!function(e){e[e.left=1]="left",e[e.right=2]="right"}(LR=LR||{}),exports.data={data:(new builder_1.FunctionBuilder).setName("each").setValue("description","like javascript forEach").setValue("use","$each[var;code;type?]").setValue("fields",[{name:"var",type:"string"},{name:"code",type:"string<interpretableCode>"},{name:"type",type:"string<left | right>",optional:!0}]).setValue("example",'$var[texts;["hi", "nya", "ily paul banks"]]\n$each[texts;\n\t$log[EACH INFO;$var[item]]\n]').setValue("returns","Void"),code:async function(){await this.resolveFields(0),await this.resolveFields(2);let[e,,t="1"]=this.fields.split(!0),a=(t=t.toLowerCase(),await this.fields.unsolve(),this.fields.get(1)),i=lodash_1.default.get(this.meta.vars,e);return lodash_1.default.isArray(i)?LR[t]?(lodash_1.default[["1","left"].includes(t)?"forEach":"forEachRight"](i,async e=>{this.meta.item=e,e=await this.data.interpreter.parse(a,this.data,this.data.client),lodash_1.default.merge(this.data,e)}),this.data.break=!1,this.makeReturn(this.meta.yields[this.id])):this.warn(`invalid type ${t.bgWhite} `+"(valid types: left | right | 1 | 2)".bgYellow):this.warn(`variable ${e.bgYellow} is not an array`)}};
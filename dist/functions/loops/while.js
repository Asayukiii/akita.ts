"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.data=void 0;const tslib_1=require("tslib"),builder_1=require("../../classes/builder"),utils_1=require("../../classes/utils"),lodash_1=tslib_1.__importDefault(require("lodash"));async function Condition(e,t,a){return t=await e.interpreter.parse(t,e,e.client),lodash_1.default.merge(e,t),e.code=a,utils_1.Utils.condition(t.code)}exports.data={data:(new builder_1.FunctionBuilder).setName("while").setValue("description","like javascript while").setValue("use","$while[condition;code;doWhileStyle?]").setValue("fields",[{name:"condition",type:"string<interpretableCode<boolean>>"},{name:"code",type:"string<interpretableCode>"},{name:"doWhileStyle",type:"boolean",optional:!0}]).setValue("example","$var[n;0]\n$var[x;0]\n$while[3>$var[n];\n\t$increment[n]\n\t$var[x;$math[$var[x]+$var[n]]]\n]").setValue("returns","Void"),code:async function(){await this.fields.unsolve();var[e,t,a="false"]=this.fields.split(!0),i=this.data.code;if(utils_1.Utils.booleanify(a))do{var s=await this.data.interpreter.parse(t,this.data,this.data.client)}while(lodash_1.default.merge(this.data,s),this.data.code=i,await Condition(this.data,e,i));else for(;await Condition(this.data,e,i);){var r=await this.data.interpreter.parse(t,this.data,this.data.client);lodash_1.default.merge(this.data,r),this.data.code=i}return this.data.break=!1,this.makeReturn(this.meta.yields[this.id]||"")}};
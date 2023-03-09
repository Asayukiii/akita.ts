"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.data=void 0;const builder_1=require("../../classes/builder"),lodash_1=require("lodash");exports.data={data:(new builder_1.FunctionBuilder).setName("call").setValue("description","...").setValue("use","$call[name;...params]").setValue("fields",[{name:"name",type:"string"},{name:"...params",type:"T"}]).setValue("example",'// client.addCallback("test", "$log[hi $1!!]")\n$call[test;Pavez] // hi Pavez!!').setValue("returns","Unknown"),code:async function(){await this.resolveFields();let[e,...t]=this.fields.split(!0);var a,s;return this.data.client.cbs[e]?this.warn("Invalid Callback Name"):(s=this.data.client.cbs[e].replace(/\$(\d+)%/g,(e,a)=>t[Number(a)-1]),a=this.data,s=await this.data.interpreter.parse(s.trim(),this.data,this.data.client),(0,lodash_1.merge)(this.data,s),this.data.code=a.code,this.data.func=a.func,this.makeReturn(this.meta.yields[this.id]||s?.code||""))}};
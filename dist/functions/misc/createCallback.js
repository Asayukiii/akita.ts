"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.data=void 0;const builder_1=require("../../classes/builder");exports.data={data:(new builder_1.FunctionBuilder).setName("createCallback").setValue("description","...").setValue("use","$createCallback[name;code]").setValue("fields",[{name:"name",type:"string"},{name:"code",type:"string<interpretableCode>"}]).setValue("example","$createCallback[test;$log[TEST;hi $1!!]]").setValue("returns","T<name>"),code:async e=>{e.func.resolve_field(e,0),await e.interpreter._(e.func);var[a,t]=e.interpreter.fields(e);return e.client.addCallback(a,t),{code:e.code?.replace(e.func.id,a)}}};
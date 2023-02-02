"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.data=void 0;const builder_1=require("../../classes/builder"),utils_1=require("../../classes/utils");exports.data={data:(new builder_1.FunctionBuilder).setName("parseTime").setValue("description","convers time to miliseconds").setValue("use","$parseTime[time]").setValue("fields",[{name:"time",type:"string<timeResolvable>"}]).setValue("example","$parseTime[1s1h] // 3601000").setValue("returns","Number"),code:async e=>(e.func=await e.func.resolve_fields(e),{code:e.code?.replace(e.func.id,utils_1.Utils.TimeToMS(e.func.inside).toString())})};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.data=void 0;const builder_1=require("../../classes/builder");exports.data={data:(new builder_1.FunctionBuilder).setName("c").setValue("description","add a comment on your code").setValue("use","$c[comment]").setValue("fields",[{name:"comment",description:"the comment (this  will not be executed)",type:"string",optional:!0}]).setValue("example","$c[$break is a util function]").setValue("returns","Void"),code:async e=>({code:e.code.replace(e.func.id,"")})};
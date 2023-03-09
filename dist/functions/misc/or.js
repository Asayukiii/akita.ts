"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.data=void 0;const builder_1=require("../../classes/builder"),utils_1=require("../../classes/utils");exports.data={data:(new builder_1.FunctionBuilder).setName("or").setValue("description","returns the first truthy value").setValue("use","$or[...args]").setValue("fields",[{name:"args",type:"any"}]).setValue("example","$or[0;false;hi;undefined] // hi\n$or[0;false;undefined] // no return").setValue("returns","Any"),code:async function(e){return await this.resolveFields(),this.makeReturn(this.fields.split(!0).find(e=>!utils_1.Utils.falsys.includes(e))||"")}};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.data=void 0;const builder_1=require("../../classes/builder"),lodash_1=require("lodash");exports.data={data:(new builder_1.FunctionBuilder).setName("item").setValue("description","get item").setValue("use","$item[key?]").setValue("returns","T<Key ? Metadata.item<Key> : Metadata.item>"),code:async function(){return await this.resolveFields(),this.makeReturn(this.inside?(0,lodash_1.get)(this.meta.item,this.inside):this.meta.item)}};
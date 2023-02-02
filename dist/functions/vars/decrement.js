"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.data=void 0;const tslib_1=require("tslib"),builder_1=require("../../classes/builder"),utils_1=require("../../classes/utils"),lodash_1=tslib_1.__importDefault(require("lodash"));exports.data={data:(new builder_1.FunctionBuilder).setName("decrement").setValue("description","decrements a numeric variable by 1").setValue("use","$decrement[key;type?]").setValue("fields",[{name:"key",type:"string<variable>"},{name:"type",type:'"prefix" | "postfix"',optional:!0}]).setValue("example","$var[index;4] $var[xedni;8]\n$decrement[index] // increments and return 3\n$increment[xedni;postfix] // decrements and return 8").setValue("returns","Number"),code:async e=>{await e.func.resolve_fields(e);var[t,r="prefix"]=e.interpreter.fields(e),i=lodash_1.default.get(e.metadata.vars,t);return["bigint","number"].includes(typeof i)?["prefix","postfix"].includes(r.toLowerCase())?(lodash_1.default.set(e.metadata.vars,t,--i),{code:e.code?.replace(e.func.id,"prefix"==r.toLowerCase()?i:++i)}):utils_1.Utils.Warn("invalid type",e):utils_1.Utils.Warn(`variable ${t.bgYellow} is not numeric`,e)}};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.data=void 0;const tslib_1=require("tslib"),builder_1=require("../../classes/builder"),utils_1=require("../../classes/utils"),lodash_1=tslib_1.__importDefault(require("lodash"));exports.data={data:(new builder_1.FunctionBuilder).setName("flat").setValue("description","mutate the array with all sub-array elements concatenated into it recursively up to the specified depth").setValue("use","$flat[key;limit?]").setValue("fields",[{name:"key",description:"the key of the array to join or a json array",type:"string<variable>"},{name:"separator",description:"the depth level specifying how deep a nested array structure should be flattened `(default: Infinity)`",type:"string",optional:!0}]).setValue("example",`$var[array;[
	"my", "best", [
		"friend's", [
			"a", "butcher"
		]
	]
]]
$flat[array] // ["my", "best", "friend's", "a", "butcher"]
$join[array] // my best friend's a butcher`).setValue("returns","Any[]"),code:async e=>{await e.func.resolve_fields(e);var[t,a=1/0]=e.interpreter.fields(e),r=lodash_1.default.get(e.metadata.vars,t,void 0);return lodash_1.default.isArray(r)?(lodash_1.default.set(e.metadata.vars,t,r.flat(Number(a))),{code:e.code.replace(e.func.id,JSON.stringify(lodash_1.default.get(e.metadata.vars,t,[]))||"")}):utils_1.Utils.Warn("Invalid Array Provided",e,!0)}};
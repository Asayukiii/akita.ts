"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.That=void 0;const lodash_1=require("lodash"),utils_1=require("./utils");class That{data;fields;constructor(t,a){this.data=t,this.fields=a}set meta(t){this.data.metadata=t}get meta(){return this.data.metadata}warn(t,a=!1){utils_1.Utils.Warn(t,this.data,a)}breakBlock(){return this.data.break=this.data.break=!0}makeReturn(t){return this.data.code=this.data.code.replace(this.id,t),{code:this.data.code}}variable(t){return(0,lodash_1.get)(this.data.metadata.vars,t)}setVariable(t,a){return(0,lodash_1.set)(this.data.metadata.vars,t,a),a}get id(){return this.data.func.id}get inside(){return this.data.func.inside}set inside(t){this.data.func.inside=t}resolveFields(t){return"number"==typeof t?this.data.func.resolve_field(this.data,t):this.data.func.resolve_fields(this.data)}}exports.That=That;
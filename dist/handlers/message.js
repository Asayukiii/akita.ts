"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const context_1=require("../classes/context");function default_1(o,s,t){var r=s.commands.filter(t=>"MESSAGE"==t.type.toUpperCase()),a=s.prefixes?.find(t=>o.content.startsWith(t)),n=new context_1.Context(o);if((i=r.filter(t=>t.names?.includes("$any"))).length&&(1==t?.bots||!o.author.bot)){var e,c=o.content.trim().split(/ +/g);for(e of i)s.resolve(e.code,{metadata:{cmd:e,args:c,msg:o,ctx:n}},s)}if(a&&(t?.bots||!o.author.bot)){let t=o.content.slice(a.length).trim().split(/ +/g),e=t.shift()?.toLocaleLowerCase();if(e){var i=r.filter(t=>t.names?.includes(e)),l={metadata:{msg:o,args:t,cmd:e,ctx:n}};if(i)for(var f of i)s.resolve(f.code,l,s)}}}exports.default=default_1;
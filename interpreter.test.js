let { Interpreter } = require("./dist/classes/interpreter"),
    { inspect } = require("util");
(new Interpreter()).parse("$log[{red:asdf} {dim:asf} {bgBlue:i luv dengler}]").then(a => console.log(a.code));
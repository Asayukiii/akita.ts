let { Interpreter } = require("./dist/classes/interpreter"),
    { inspect } = require("util");
(new Interpreter()).parse("$upper[asdfasdfadsf]").then(a => console.log(a.code));
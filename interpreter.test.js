let { Interpreter } = require("./dist/classes/interpreter"),
    { inspect} = require("util");
(new Interpreter()).functions.forEach(a => console.log(inspect(a.data, { depth: Infinity })))
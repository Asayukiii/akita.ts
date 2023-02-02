# **AkitaTS** - Imagine easy bots
>  Fast, easy and string based with BDFD syntax

![Japanese Akita](https://imgs.search.brave.com/_Zfncw4BTyC7iTJlthHAnBxdH_xKjzU2Bp60OSoc4lo/rs:fit:313:313:1/g:ce/aHR0cHM6Ly82NC5t/ZWRpYS50dW1ibHIu/Y29tLzg5NjEyNTdj/MDBlZjgwNWVlMDAz/OTUzZmZlN2Q0NDJk/L3R1bWJscl9wMGpv/NzFSRTNRMXIzdmg3/cm8xXzQwMC5naWZ2)

- - -

```js
// import { AkitaClient } from "akita.ts";
var { AkitaClient } = require("akita.ts"),
    client = new AkitaClient({
        intents: [1, 2, 512, 32768] /* example discord intents */
    }, "BOT_PREFIX");
client.onMessageCreate();
client.addCommand({
    names: ["test"],
    type: "MESSAGE",
    code: `
    $content[Hi $author[username]!]
    $send[no]
    `
});
client.login("YOUR_BOT_TOKEN");
```

- - -

## Custom Functions

~~~js
// import { FunctionBuilder } from "akita.ts";
client.interpreter.addFunction({
    data: new FunctionBuilder()
        .setName('THE FUNCTION NAME WITHOUT $') // "myFunc"
        .setValue('description', 'THE FUNCTION DESCRIPTION') // "makes something"
        .setValue('use', 'AN EXAMPLE OF USE') // "$myFunc[arg1;arg2;...rest]"
        .setValue('returns', 'TYPE'), // "String"
    code: async (d: Data) => {
        // This will allow the inside of $myFunc to be executed! ("d" IS necessary)
        // await d.func.resolve_overloads(d);

        // This execute an especific field of $myFunc ("d" IS necessary)
        // await d.func.resolve_overload(d, index);
        return {
            code: d.code.replace(d.func.id, /* result, use "" for void value*/)
        };
    }
});
~~~

### Function Interface <small>*(for d.func)*</small>

~~~json
{
    "resolve_fields": "ASYNC FUNCTION",
    "resolve_field": "ASYNC FUNCTION",
    "fields": [{
        "value": "STRING",
        "overs": "Array<FUNCTION DATA>",
    }, "..."],
    "inside": "STRING",
    "total": "STRING",
    "name": "STRING",
    "id": "STRING"
}
~~~

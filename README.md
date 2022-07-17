# EASY-API.TS
Make your own API with ease...

![img](https://i.imgur.com/2ksZSBy.jpg)

## Features
- 🚀 Optimized and advanced codes and functions.
- 📝 Easy to learn.
- 📚 Constant updates.
- 🔥 Sexy dev.

## Install
```
npm i easy-api.ts
```

Check documentation [here](https://eats.miduwu.ga/) and join our [support server](https://discord.gg/fc6n37dCgY).

## Setup
```js
const { API } = require('easy-api.ts')

const api = new API({
    port: process.env.PORT || 3000
})

api.routes.add({
    path: '/color',
    code: `
    $ignore[Check docs to see how does functions work]
    $send[200;canvas;$default]
    $drawRect[0;0;512;512]
    $color[$getQuery[hex]]
    $createCanvas[512;512]
    $if[$isValidHex[$getQuery[hex]]==false;400;{
        error: "Invalid hex code provided."
    }]
    $if[$getQuery[hex]==undefined;400;{
        error: "Missing 'hex' parameter."
    }]
    `
})

// Lets load the handler...
api.routes.load('./routes').then(() => {
    console.log('Source loaded.')
    api.connect() // We're connecting to the API when the source is loaded.
})
```

Made with ❤️ by a Moonlight Group member~

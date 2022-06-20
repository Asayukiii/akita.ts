# EASY-API.TS
Make your own API with ease...

![img](https://i.imgur.com/2ksZSBy.jpg)

- An easy api wrapper inspired in [aoi.js](https//npmjs.com/package/aoi.js)

## Install
```
npm i easy-api.ts
```

Check documentation [here](https://eats.miduwu.ga/) and join our [support server](https://discord.gg/fc6n37dCgY).

## Setup
```js
const { API } = require('easy-api.ts')

const api = new API({
    port: 3000
})

api.routes.add({
    path: '/endpoint',
    code: `
    $log[This is a console log hehe]
    $send[200;json;{
        success: true
    }]
    `
})

api.connect()
```

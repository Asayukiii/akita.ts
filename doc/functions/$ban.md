# **$ban**
> **Bans a user** <br/>
> $ban[user;options?;guild?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| User | The user Id that will be banned | Snowflake&lt;user&gt; | True |
| Options | Ban options <small>see more [here](https://discord.js.org/#/docs/discord.js/main/typedef/BanOptions)<small> `(default: {})` | HJSOEncodable | False |
| Guild | The guild Id where the action will take place `(default: ?ContextGuildId)` | Snowflake&lt;guild&gt; | False |

### Returns
> Boolean

### Example
> ```php
$ban[$author[id];{ reason: "idk..." }]
```
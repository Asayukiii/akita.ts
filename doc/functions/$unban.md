# **$unban**
> **Unbans a user** <br/>
> $unban[user;reason?;guild?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| User | The user Id that will be unbanned | Snowflake&lt;user&gt; | True |
| Reason | The "why" will be unbanned `(default: none)` | String | False |
| Guild | The guild Id where this action will take place `(defalut: ?ContextGuildId)` | Snowflake&lt;guild&gt; | False |

### Returns
> Boolean

### Example
> ```php
$unban[772558414605844480;cuz is so hot]
```
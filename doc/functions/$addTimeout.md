# **$addTimeout**
> **...** <br/>
> $addTimeout[time;id;data;code]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Time | Unknown | Time | True |
| Id | Unknown | String &#124; &quot;random&quot; | True |
| Code | Unknown | String&lt;interpretableCode&gt; | True |

### Returns
> Void

### Example
> ```php
$addTimeout[5s;asdf;$log[TIMEOUT;hi!]]
```
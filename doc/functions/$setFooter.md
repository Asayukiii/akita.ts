# **$setFooter**
> **Sets the footer of this embed** <br/>
> $setFooter[index;text;iconURL?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Index | The index of the embed | Number[0,4] | True |
| Text | The text of the embed footer | String | True |
| IconURL | The icon of the embed footer | String&lt;URL&gt; | True |

### Returns
> Void

### Example
> ```php
$setFooter[0;$author[tag];$author[displayAvatarURL]]
```
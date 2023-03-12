# **$addButton**
> **Add a button component at the instance.** <br/>
> $addButton[label;style;customId;disabled?;emoji?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Label | The text that appears on the button. | String[max_length=80] | True |
| Style | The button style `(Primary=1; Secondary=2; Success=3; Danger=4; Link=5)`. | Number[1,5] | True |
| CustomId | Custom identifier for the button `(If the style is 5, the URL should go here)`. | String[max_length=80] | True |
| Disabled | Whether the button is disabled `(default: false)`. | Boolean | False |
| Emoji | The emoji that appears on the button. | String | False |

### Returns
> Void

### Example
> ```php
$addButton[press me!;1;button_1]
```
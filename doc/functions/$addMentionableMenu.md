# **$addMentionableMenu**
> **Add a mentionable select menu component at the instance.** <br/>
> $addMentionableMenu[placeholder?;customId;disabled?;minValues?;maxValues?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Placeholder | Placeholder text if nothing is selected. | String[max_length=150] | False |
| CustomId | Custom identifier for the menu. | String[max_length=100] | True |
| Disabled | Whether the menu is disabled `(default: false)`. | Boolean | False |
| MinValues | Minimum number of options that must be chosen `(default: 1)`. | Number[0,25] | False |
| MaxValues | Maximum number of options that can be chosen `(default: 1)`. | Number[1,25] | False |

### Returns
> Void

### Example
> ```php
$addMentionableMenu[select some channel;channel_menu_1;text]
```
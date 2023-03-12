# **$addStringMenu**
> **Add a string select menu component at the instance.** <br/>
> $addStringMenu[placeholder?;customId;disabled?;options;minValues?;maxValues?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Placeholder | Placeholder text if nothing is selected. | String[max_length=150] | False |
| CustomId | Custom identifier for the menu. | String[max_length=100] | True |
| Options | Specified choices for the menu. | [SelectMenuComponentOptionData](https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure)[] | True |
| Disabled | Whether the menu is disabled `(default: false)`. | Boolean | False |
| MinValues | Minimum number of options that must be chosen `(default: 1)`. | Number[0,25] | False |
| MaxValues | Maximum number of options that can be chosen `(default: 1)`. | Number[1,25] | False |

### Returns
> Void

### Example
> ```php
$addStringMenu[select some;menu_1;[{
	label: "no. 1",
	value: "option_1"
}, {
	label: "no. 2",
	value: "option_2"}]]
```
# **$addChannelMenu**
> **Add a channel select menu component at the instance.** <br/>
> $addChannelMenu[placeholder?;customId;channelTypes?;disabled?;minValues?;maxValues?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Placeholder | Placeholder text if nothing is selected. | String[max_length=150] | False |
| CustomId | Custom identifier for the menu. | String[max_length=100] | True |
| Disabled | Whether the menu is disabled `(default: false)`. | Boolean | False |
| ChannelTypes? | List of channel types to include in this menu `(separator: ,)`. | &quot;Text&quot; &#124; &quot;DM&quot; &#124; &quot;Voice&quot; &#124; &quot;groupDM&quot; &#124; &quot;Category&quot; &#124; &quot;Announcement&quot; &#124; &quot;AnnouncementThread&quot; &#124; &quot;PublicThread&quot; &#124; &quot;PrivateThread&quot; &#124; &quot;StageVoice&quot; &#124; &quot;Directory&quot; &#124; &quot;Forum&quot; | True |
| MinValues | Minimum number of options that must be chosen `(default: 1)`. | Number[0,25] | False |
| MaxValues | Maximum number of options that can be chosen `(default: 1)`. | Number[1,25] | False |

### Returns
> Void

### Example
> ```php
$addChannelMenu[select some channel;channel_menu_1;text]
```
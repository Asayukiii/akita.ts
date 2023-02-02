# **$flat**
> **Mutate the array with all sub-array elements concatenated into it recursively up to the specified depth** <br/>
> $flat[key;limit?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Key | The key of the array to join or a json array | String&lt;variable&gt; | True |
| Separator | The depth level specifying how deep a nested array structure should be flattened `(default: Infinity)` | String | False |

### Returns
> Any[]

### Example
> ```php
$var[array;[
	"my", "best", [
		"friend's", [
			"a", "butcher"
		]
	]
]]
$flat[array] // ["my", "best", "friend's", "a", "butcher"]
$join[array] // my best friend's a butcher
```
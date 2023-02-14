# **$join**
> **Unify the values of an array in a string** <br/>
> $join[key;separator?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Key | The key of the array to join or a json array | String&lt;variable&gt; &#124; array | True |
| Separator | The element separator `(default \b)` | String | False |

### Returns
> String

### Example
> ```php
$var[array;["hola!", "sabias", "que", "hablo", "español?"]]
$join[array; ] // hola! sabias que hablo español?
```
# **$decrement**
> **Decrements a numeric variable by 1** <br/>
> $decrement[key;type?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Key | Unknown | String&lt;variable&gt; | True |
| Type | Unknown | &quot;prefix&quot; &#124; &quot;postfix&quot; | False |

### Returns
> Number

### Example
> ```php
$var[index;4] $var[xedni;8]
$decrement[index] // increments and return 3
$increment[xedni;postfix] // decrements and return 8
```
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
$var[a;4] $var[b;8]
$decrement[a] // decrements and return 3
$increment[b;postfix] // decrements and return 8
```
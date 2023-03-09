# **$increment**
> **Increments a numeric variable by 1** <br/>
> $increment[key;type?]
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
$increment[a] // increments and return 5
$increment[b;postfix] // increments and return 8
```
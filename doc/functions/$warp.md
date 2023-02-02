# **$warp**
> **Limit the size of a string if necessary** <br/>
> $warp[string;limit;ellipsis?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| String | Unknown | String | True |
| Limit | Unknown | Number | True |
| Ellipsis | `(default: ...)` | String | True |

### Returns
> String

### Example
> ```php
$warp[totbl its the best;5] // totbl...
//$warp[var:key;...] for variables, this mutates the variable
```
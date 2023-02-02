# **$endsWith**
> **Checks if string ends with the given target string** <br/>
> $endsWith[text;target;position?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Text | Unknown | String | True |
| Target | Unknown | String | True |
| Position | Unknown | Number | False |

### Returns
> Boolean

### Example
> ```php
$endsWith[hi mid;mid] // true
$var[hi;hi inu]
$endsWith[var:hi;mid] // false
```
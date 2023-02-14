# **$startsWith**
> **Checks if string starts with the given target string** <br/>
> $startsWith[string;target;position?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| String | Unknown | String | True |
| Target | Unknown | String | True |
| Position | Unknown | Number | True |

### Returns
> Boolean

### Example
> ```php
$startsWith[hi someone;hi] // true
//var value: hi mid
$startsWith[var:NAME;hello] // false
```
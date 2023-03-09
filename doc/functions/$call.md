# **$call**
> **...** <br/>
> $call[name;...params]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Name | Unknown | String | True |
| ...params | Unknown | T | True |

### Returns
> Unknown

### Example
> ```php
// client.addCallback("test", "$log[hi $1!!]")
$call[test;Pavez] // hi Pavez!!
```
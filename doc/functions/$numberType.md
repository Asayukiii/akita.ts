# **$numberType**
> **Returns the number &quot;type&quot;** <br/>
> $numberType[integer]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Integer | Unknown | Number | True |

### Returns
> &quot;Natural&quot; &#124; &quot;Float&quot; &#124; &quot;Complex&quot; &#124; &quot;NaN&quot;

### Example
> ```php
$numberType[1e-4] // Complex
$numberType[hi] // NaN
// 123 is considered Natural
// 3.045 is considered Float
// 1e+4 is considered Complex
```
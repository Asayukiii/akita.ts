# **$for**
> **Like javascript for** <br/>
> $for[start;condition;iterator;code]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Start | Unknown | Number | True |
| Condition | Unknown | String&lt;interpretableCode&lt;boolean&gt;&gt; | True |
| Iterator | Unknown | String&lt;interpretableCode&gt; &#124; string&lt;default &#124; default2&gt; | True |
| Code | Unknown | String&lt;interpretableCode&gt; | True |

### Returns
> Void

### Example
> ```php
$for[0;$var[index]<100;default;$log[;INDEX NUMBER $var[index]]]
```
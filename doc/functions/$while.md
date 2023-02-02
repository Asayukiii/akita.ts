# **$while**
> **Like javascript while** <br/>
> $while[condition;code;doWhileStyle?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Condition | Unknown | String&lt;interpretableCode&lt;boolean&gt;&gt; | True |
| Code | Unknown | String&lt;interpretableCode&gt; | True |
| DoWhileStyle | Unknown | Boolean | False |

### Returns
> Void

### Example
> ```php
$var[n;0]
$var[x;0]
$while[3>n;
	$var[n;$math[$var[n]+1]]
	$var[x;$math[$var[x]+$var[n]]]
]
```
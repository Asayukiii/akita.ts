# **$if**
> **Execute a code if the given condition is truthy** <br/>
> $if[condition;truthy;falsy?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Condition | Unknown | String&lt;interpretableCode&gt; | True |
| Truthy | Unknown | String&lt;interpretableCode&gt; | True |
| False | Unknown | String&lt;interpretableCode&gt; | False |

### Returns
> Unknown

### Example
> ```php
$if[$author[username]==Pavez;Hi best developer;Hi... shitty person]
```
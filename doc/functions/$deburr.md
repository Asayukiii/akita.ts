# **$deburr**
> **Deburrs string by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks** <br/>
> $deburr[text]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Text | Unknown | String | True |

### Returns
> String

### Example
> ```php
$deburr[Hí Máxîm] // Hi Maxim
```
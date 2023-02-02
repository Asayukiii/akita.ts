# **$or**
> **Returns the first truthy value** <br/>
> $or[...args]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Args | Unknown | Any | True |

### Returns
> Any

### Example
> ```php
$or[0;false;hi;undefined] // hi
$or[0;false;undefined] // no return
```
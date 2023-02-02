# **$args**
> **Get ContextMessageArguments data (if exists)** <br/>
> $args[key?]
- - -

### Fields
| name | description | type | required |
|------|-------------|------|----------|
| Key | Property to get | String | False |

### Returns
> Unknown

### Example
> ```php
// my msg: !some-command hi, im sdlg and i hate mid
$args // all args (hi, im sdlg)
$args[n] // specific argument ($args[0] = hi,)
$args[n..m?] // slice arguments ($args[2..4] = sdlg and i)
$args[length] // arguments size
```
# How to open repo locally

Step 1 - install node-modules
```
npm install 
```

Step 2 - open local server
```
npm run start
```

# How to import MUI components

In order to avoid overriding styles in the Authoring Application and to improve performance, destructure all import statements from "@mui/material".

# Example 1 - importing components from MUI

Do this...
```
import { AppBar } from '@mui/material';
```

Not this...
```
import AppBar from '@mui/material/AppBar';
```

# Example 2 - importing icons from MUI

Do this...

```
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
```

Not this...
```
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';

```
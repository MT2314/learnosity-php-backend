// create a new file called `MuiClassNameSetup.js` at the root or src folder.
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';

ClassNameGenerator.configure(
  // Do something with the componentName
  (componentName) => `foooooooooooo-${componentName}`,
);

import "@mui/lab/themeAugmentation";

import { createTheme as createMuiTheme } from "@mui/material/styles";
import colors from "./colors";
import typography from "./typography";
import createTheme from "saas/createTheme";

//* Theming styles
//? SaaS Imports
const saasTheme = createTheme("DEFAULT");

export const createMFTheme = () => {
  return createMuiTheme(
    {
      typography: typography,
      palette: colors,
    },
    saasTheme
  );
};

export default createMFTheme;

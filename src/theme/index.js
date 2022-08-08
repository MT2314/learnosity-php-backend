import "@mui/lab/themeAugmentation";

import { createTheme as createMuiTheme } from "@mui/material/styles";
import colors from "./colors";
import typography from "./typography";
import overrides from "./overrides";
import createTheme from "saas/createTheme";

//* Theming styles
//? SaaS Imports
const saasTheme = createTheme("DEFAULT");

export const createMFTheme = () => {
  return createMuiTheme(saasTheme, {
    components: overrides,
    typography: typography,
    palette: colors,
  });
};

export default createMFTheme;

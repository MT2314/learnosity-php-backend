import "@mui/lab/themeAugmentation";

import { createTheme as createMuiTheme } from "@mui/material/styles";
import colors from "./colors";
import typography from "./typography";
import components from "./components";
import createTheme from "saas/createTheme";

export const createPPTheme = () => {
  const saasTheme = createTheme("DEFAULT");

  return createMuiTheme(saasTheme, {
    components: components,
    typography: typography,
    palette: colors,
  });
};

export default createPPTheme;

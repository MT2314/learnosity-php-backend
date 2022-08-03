import "@mui/lab/themeAugmentation";

import { createTheme as createMuiTheme } from "@mui/material/styles";
import colors from "./colors";
import typography from "./typography";
import components from "./components";
import shadows from "./shadows";
import createTheme from "saas/createTheme";

export const createPPTheme = () => {
  const saasTheme = createTheme("DEFAULT");

  return createMuiTheme(
    {
      components: components,
      typography: typography,
      shadows: shadows,
      palette: colors,
    },
    saasTheme
  );
};

export default createPPTheme;

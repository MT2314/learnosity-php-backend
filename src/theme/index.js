import "@mui/lab/themeAugmentation";

import { createTheme as createMuiTheme } from "@mui/material/styles";
import colors from "./colors";
import typography from "./typography";

export const createPPTheme = () => {
  return createMuiTheme({
    typography: typography,
    palette: colors,
  });
};

export default createPPTheme;

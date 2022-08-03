// ? Component Overrides
const components = {
  // ? config bar boxShadow
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: "0px 0px 0px 0px #0000001A",
      },
    },
  },
  // ? Tooltip
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        // * Background Color
        background: "rgba(97, 97, 97, 0.9);",
        // * Text Color
        color: "#fff;",
        font: "10px/14px inter",
        fontWeight: 500,
      },
    },
  },
};

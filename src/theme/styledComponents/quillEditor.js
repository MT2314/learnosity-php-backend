import styled from "@emotion/styled";

export const ReactQuillContainer = styled("div")(
  ({ theme, isInfoBox, isVideo }) => ({
    "& .ql-container": {
      background: !isInfoBox ? "rgba(255, 255, 255, 1)" : "#FAFAFA",
      padding: !isInfoBox && !isVideo ? "40px 104px" : "15px 15px",
      paddingBottom: isVideo && "10px",
      minHeight: !isVideo ? "100px" : "30px",
      ...(isInfoBox || (isVideo && { margin: "0px 0px 0px -15px !important" })),
    },
    "& .ql-editor": {
      minHeight: !isVideo ? "100px" : "20px",
      height: isVideo && "20px",
      padding: !isInfoBox || !isVideo ? "0 15px" : "0px",
      paddingBottom: isVideo && "20px",
      border: `none`,
      borderRadius: `none`,
      boxShadow: `none`,
      color: "rgba(35, 35, 35, 1)",
      background: "#ffffff",
      fontWeight: 400,
      fontSize: "16px",
      fontFamily: ["Inter", "sans-serif"].join(","),
      letterSpacing: "0.15px",
      letterHeight: "24px",
      background: !isInfoBox ? "rgba(255, 255, 255, 1)" : "#FAFAFA",
      "& p": {
        marginLeft: "-12px",
      },
    },
    "& .ql-editor.ql-blank::before": {
      padding: !isInfoBox && !isVideo ? "0px 104px" : "0px !important",
      background: isVideo && "rgba(255, 255, 255, 1)",
    },
    "& .ql-editor.ql-blank::after": {
      background: isVideo && "rgba(255, 255, 255, 1)",
    },
    "& .ql-toolbar .MuiPaper-root": {
      background: !isInfoBox && !isVideo ? "rgba(255, 255, 255, 1)" : "#FAFAFA",
    },
  })
);

export default ReactQuillContainer;

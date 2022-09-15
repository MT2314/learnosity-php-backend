import styled from "@emotion/styled";

export const ReactQuillContainer = styled("div")(({ theme, isInfoBox }) => ({
  "& .ql-container": {
    background: !isInfoBox ? "rgba(255, 255, 255, 1)" : "#FAFAFA",
    padding: !isInfoBox ? "40px 104px" : "15px 15px",
    minHeight: "100px",
    ...(isInfoBox && { margin: "0px 0px 0px -15px !important" }),
  },
  "& .ql-editor": {
    minHeight: "96px",
    padding: !isInfoBox ? "0 15px" : "0px",
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
  },
  "& .ql-editor.ql-blank::before": {
    padding: !isInfoBox ? "0px 104px" : "0px !important",
  },
  "& .ql-toolbar .MuiPaper-root": {
    background: !isInfoBox ? "rgba(255, 255, 255, 1)" : "#FAFAFA",
  },
}));

export default ReactQuillContainer;

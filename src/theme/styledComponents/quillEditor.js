import styled from "@emotion/styled";

export const ReactQuillContainer = styled("div")(({ theme }) => ({
  "& .ql-container": {
    backgroundColor: theme.palette.test.qa,
    padding: "40px 104px",
    minHeight: "100px",
  },
  "& .ql-editor": {
    minHeight: "96px",
    padding: "0 15px",
    border: `none`,
    borderRadius: `none`,
    boxShadow: `none`,
    color: theme.palette.quillEditor.fontColor,
    background: theme.palette.common.white,
    fontWeight: theme.typography.quillEditor.fontWeight,
    fontSize: theme.typography.quillEditor.fontSize,
    fontFamily: theme.typography.quillEditor.fontFamily,
    letterSpacing: theme.typography.quillEditor.letterSpacing,
    letterHeight: theme.typography.quillEditor.letterHeight,
  },
  "& .ql-editor.ql-blank::before": {
    padding: "0px 104px",
  },
}));

export default ReactQuillContainer;

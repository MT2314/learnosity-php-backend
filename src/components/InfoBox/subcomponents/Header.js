import React, { useCallback, useContext } from "react";

import styled from "@emotion/styled";

import { InfoBoxContext } from "../InfoBoxContext";
import { TextareaAutosize } from "@material-ui/core";

const StyledHeaderInput = styled(TextareaAutosize)({
  width: "40.625rem",
  height: "2.5rem",
  margin: 0,
  padding: 0,
  border: "none",
  resize: "none",
  lineHeight: "2.48rem",
  background: "#FAFAFA",
  fontFamily: `"Inter", sans-serif`,
  fontSize: "2.125rem",
  fontWeight: "500",
  color: "rgba(35, 35, 35, 1)",
  "&::placeholder": {
    color: "rgba(35, 35, 35, 1)",
  },
  "&:focus": {
    outline: "none",
    "&::placeholder": {
      color: "rgba(0, 0, 0, 0.12)",
    },
  },
});
const Header = ({ t }) => {
  const [state, dispatch] = useContext(InfoBoxContext);

  const handleHeaderChange = useCallback((e) => {
    dispatch({
      func: "CHANGE_HEADER",
      header: e.target.value,
    });
  }, []);

  return (
    <StyledHeaderInput
      name="infoBoxHeader"
      role="textbox"
      aria-label={t("Infobox Header Aria")}
      placeholder={t("Infobox Header Placeholder")}
      aria-multiline="true"
      value={state.infoBoxHeader.heading}
      onChange={handleHeaderChange}
    />
  );
};

export default Header;

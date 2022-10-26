import React, { useCallback, useContext } from "react";
// MUI/@emotion imports
import styled from "@emotion/styled";
// ? Context
import { InfoBoxContext } from "../InfoBoxContext";

const StyledLabelInput = styled("input")({
  fontSize: "0.875rem",
  fontWeight: "400",
  lineHeight: "1.25125rem",
  color: "rgba(99, 99, 99, 1)",
  width: "40.625rem",
  height: "1.25rem",
  background: "#FAFAFA",
  letterSpacing: "0.15px",
  border: "none",
  padding: 0,

  "&::placeholder": {
    color: "rgba(99, 99, 99, 1)",
  },

  "&:focus": {
    outline: "none",

    "&::placeholder": {
      color: "rgba(0, 0, 0, 0.12)",
    },
  },
});
const Label = ({ t }) => {
  const [state, dispatch] = useContext(InfoBoxContext);

  const handleLabelChange = useCallback((e) => {
    dispatch({
      func: "CHANGE_LABEL",
      label: e.target.value,
    });
  }, []);

  return (
    <StyledLabelInput
      id="infoBox-label"
      type="text"
      aria-label={t("Infobox Label Aria")}
      placeholder={t("Infobox Label Placeholder")}
      role="textbox"
      autocomplete="false"
      maxLength={50}
      multiline={false}
      aria-multiline={false}
      value={state.infoBoxLabel}
      onChange={handleLabelChange}
    />
  );
};

export default Label;

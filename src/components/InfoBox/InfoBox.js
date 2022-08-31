import React, { useState, useRef } from "react";
// MUI/@emotion imports
import { Paper, NativeSelect } from "@mui/material";
import { TextareaAutosize } from "@material-ui/core";
import styled from "@emotion/styled";
// Component imports
import InfoBoxToolbar from "./toolbar/InfoBoxToolbar";
// import { InfoBoxBody } from "./subcomponents/InfoBoxBody";
// Hook/utilities imports
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
// Icon imports
import { defaultIcon } from "./icons/infoBoxIcons";
// Localization import
import { useTranslation, Trans } from "react-i18next";

// Default props
export const defaultProps = {
  infoBoxIcon: "",
  infoBoxLabel: "",
  infoBoxHeader: "",
  infoBoxBody: null
};

// Styled components begin
const StyledPaper = styled(Paper)({
   background: "rgb(236, 236, 236)",
   height: "227px",
   width: "968px",
   fontFamily: `"Inter", sans-serif`,
   padding: "40px 104px",
   display: "flex",
   background: "#FAFAFA",
});

const StyledTextContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "650px",
  marginLeft: "2.029rem",
});

const StyledLabelInput = styled("input")({
  fontSize: "0.875rem",
  fontWeight: "400",
  lineHeight: "1.25rem",
  color: "#636363",
  width: "100%",
  background: "#FAFAFA",
  letterSpacing: "0.009375rem",
  border: "none",

  "&::placeholder": {
    color: "#636363",
  },

  "&:focus": {
    outline: "none",
    
    "&::placeholder": {
      color: "rgba(0, 0, 0, 0.12)",
    },
  },
});

const StyledHeaderInput = styled("input")({
  fontSize: "2.125rem",
  fontWeight: "500",
  lineHeight: "2.5rem",
  color: "#232323",
  width: "100%",
  background: "#FAFAFA",
  border: "none",

  "&::placeholder": {
    color: "#232323",
  },

  "&:focus": {
    outline: "none",
    
    "&::placeholder": {
      color: "rgba(0, 0, 0, 0.12)",
    },
  },
});

const StyledBodyTextArea = styled(TextareaAutosize)({
  fontFamily: `"Inter", sans-serif`,
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "1.5rem",
  letterSpacing: "0.009375rem",
  color: "#232323",
  width: "100%",
  minHeight: "72px",
  marginTop: "0.9375rem",
  background: "#FAFAFA",
  border: "none",
  resize: "none",

  "&::placeholder": {
    color: "#232323",
  },

  "&:focus": {
    outline: "none",
    
    "&::placeholder": {
      color: "rgba(0, 0, 0, 0.12)",
    },
  },
})

// InfoBox component
const InfoBox = ({
  infoBoxIcon,
  infoBoxLabel,
  infoBoxHeader,
  infoBoxBody,
//   setProp = () => {},
}) => {

  // Localization
  const { t } = useTranslation();

  const [showToolbar, setShowToolbar] = useState(false);

  const infoBoxRef = useRef();

  const StyledToolbarContainer = styled("div")({
    display: showToolbar ? "block" : "none",
    position: "fixed !important",
    top: "80px !important",
    left: "50% !important",
    transform: "translateX(-50%) !important",
    zIndex: "1000",
    justifyContent: "center !important",
    backgroundColor: "#fff !important",
  });

  useOnClickOutside(infoBoxRef, () => {
    setShowToolbar(false);
  });

  const handleOnFocus = (e) => {
    const relatedTarget = e.relatedTarget || document.activeElement;
    if (relatedTarget || e.currentTarget.contains(relatedTarget)) {
      setShowToolbar(true);
    };
  };

  const handleOnBlur = (e) => {
    const relatedTarget = e.relatedTarget || document.activeElement;
    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
      setShowToolbar(false);
    };
  };

  return (
    <StyledPaper
      aria-label="Info Box"
      data-testid="infoBox-container"
      ref={infoBoxRef}
      onClick={() => {
        setShowToolbar(true);
      }}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
    >
      <StyledToolbarContainer>
        <InfoBoxToolbar />
      </StyledToolbarContainer>
      <div>
        {defaultIcon}
      </div>
      <StyledTextContainer>
        <StyledLabelInput
          type="text"
          placeholder="Type your label here"
          aria-label="InfoBox label"
        />
        <StyledHeaderInput
          type="text"
          placeholder="Type your header here"
          aria-label="InfoBox header"
        />
        <StyledBodyTextArea
          name="infoBoxBody"
          aria-label="InfoBox body"
          aria-multiline="true"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
      </StyledTextContainer>
    </StyledPaper>
  );
};

export default InfoBox;

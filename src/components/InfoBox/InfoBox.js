import React, { useState, useRef } from "react";
// MUI/@emotion imports
import { Paper } from "@mui/material";

import styled from "@emotion/styled";
// ?Provider
import { InfoBoxProvider } from "./InfoBoxContext";

// Component imports

import Label from "./subcomponents/Label";
import Header from "./subcomponents/Header";
import Body from "./subcomponents/Body";

// Hook/utilities imports
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
// Icon imports
import { defaultIcon } from "./icons/infoBoxIcons";
// Localization import
import { useTranslation, Trans } from "react-i18next";

// Default props
export const defaultProps = {
  infoBoxIcon: null,
  infoBoxLabel: "",
  infoBoxHeader: {
    heading: "",
    headingLevel: "3",
  },
  body: null,
};

// Styled components begin
const StyledPaper = styled(Paper)({
  background: "rgb(236, 236, 236)",
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

// InfoBox component
const InfoBox = ({ infoBoxState = defaultProps, setProp = () => {} }) => {
  // Localization
  const { t } = useTranslation();

  const [selectedIcon, setSelectedIcon] = useState(null);
  const [closeToolbar, setCloseToolbar] = useState(false);
  const [infoHasFocus, setInfoHasFocus] = useState(false);

  const infoBoxRef = useRef();

  useOnClickOutside(infoBoxRef, () => {
    setCloseToolbar(true);
    setInfoHasFocus(false);
  });

  return (
    <InfoBoxProvider infoBoxState={infoBoxState} setProp={setProp}>
      <StyledPaper
        aria-label="Info Box"
        data-testid="infoBox-container"
        ref={infoBoxRef}
      >
        {selectedIcon !== null ? selectedIcon.icon : defaultIcon}
        <StyledTextContainer>
          <Label setInfoHasFocus={setInfoHasFocus} />
          <Header setInfoHasFocus={setInfoHasFocus} />
          <Body
            closeToolbar={closeToolbar}
            infoHasFocus={infoHasFocus}
            selectedIcon={selectedIcon}
            setCloseToolbar={setCloseToolbar}
            setSelectedIcon={setSelectedIcon}
            setInfoHasFocus={setInfoHasFocus}
          />
        </StyledTextContainer>
      </StyledPaper>
    </InfoBoxProvider>
  );
};

export default InfoBox;

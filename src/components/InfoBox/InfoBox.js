import React, { useState, useRef, useMemo } from "react";
// MUI/@emotion imports
import { Paper } from "@mui/material";

import styled from "@emotion/styled";
// ?Provider
import { InfoBoxProvider } from "./InfoBoxContext";

// Component imports

import Label from "./subcomponents/Label";
import Header from "./subcomponents/Header";
import Body from "./subcomponents/Body";
import Icon from "./subcomponents/Icon";

// Hook/utilities imports
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
// Icon imports
import { iconDropdownOptions, defaultIcon } from "./icons/infoBoxIcons";
// Localization import
import { useTranslation, Trans } from "react-i18next";

// Default props
export const defaultProps = {
  infoBoxState: {
    infoBoxIcon: null,
    infoBoxLabel: "",
    infoBoxHeader: {
      heading: "",
      headingLevel: "H3",
    },
    body: null,
  }
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

  const [infoHasFocus, setInfoHasFocus] = useState(false);
  const [infoAreaFocused, setInfoAreaFocused] = useState(false);

  const [infoBoxBody, setInfoBoxBody] = useState(null);
  const [placeHolder, setPlaceHolder] = useState(null);

  const isInfoBox = useMemo(() => true, []);
  const infoBoxRef = useRef();

  useOnClickOutside(infoBoxRef, () => {
    setInfoHasFocus(false);
    setInfoAreaFocused(false);
  });

  const infoBoxFocused = (e) => {
    setInfoAreaFocused(true);
    if (!infoBoxBody.contains(e.target) && e.target !== placeHolder) {
      setInfoHasFocus(true);
    }
  };

  return (
    <InfoBoxProvider infoBoxState={infoBoxState} setProp={setProp}>
      <StyledPaper
        aria-label={t("InfoBox")}
        data-testid="infoBox-container"
        ref={infoBoxRef}
        onClick={(e) => infoBoxFocused(e)}
        onFocus={(e) => infoBoxFocused(e)}
      >
        <Icon setSelectedIcon={setSelectedIcon} selectedIcon={selectedIcon} />
        <StyledTextContainer>
          <Label t={t} />
          <Header t={t} />
          <Body
            isInfoBox={isInfoBox}
            infoHasFocus={infoHasFocus}
            selectedIcon={selectedIcon}
            infoAreaFocused={infoAreaFocused}
            setSelectedIcon={setSelectedIcon}
            setInfoHasFocus={setInfoHasFocus}
            setInfoBoxBody={setInfoBoxBody}
            setPlaceHolder={setPlaceHolder}
            t={t}
          />
        </StyledTextContainer>
      </StyledPaper>
    </InfoBoxProvider>
  );
};

export default InfoBox;

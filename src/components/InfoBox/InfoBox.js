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
      headingLevel: "",
    },
    body: null,
  },
};

// Styled components begin
const StyledPaper = styled(Paper)({
  width: "100%",
  fontFamily: `"Inter", sans-serif`,
  padding: "2.5rem 6.5rem 1.5625rem 6.5625rem",
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

  const src = "http://127.0.0.1/learnosity-demos/www/assessment/inline.php";

  return (
    <div>
      <iframe src={src} frameBorder="0" sandbox></iframe>
    </div>
  );
};

export default InfoBox;

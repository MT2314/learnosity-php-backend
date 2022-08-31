import React, { useState } from "react";

import { Paper, NativeSelect } from "@mui/material";

import styled from "@emotion/styled";
// import infoBoxOptions from "./utility/infoBoxOptions";

import { useTranslation, Trans } from "react-i18next";

export const defaultProps = { infoBoxIcon: "", infoBoxLabel: "", infoBoxHeader: "", infoBoxBody: null };

const StyledPaper = styled(Paper)({
   background: "rgb(236, 236, 236)",
   height: "227px",
   width: "968px",
   fontFamily: `"Inter", sans-serif`,
   padding: "40px 104px",
   display: "flex",
   background: "#FAFAFA",
});

const InfoBox = ({
  infoBoxIcon,
  infoBoxLabel,
  infoBoxHeader,
  infoBoxBody,
//   setProp = () => {},
}) => {

  const { t } = useTranslation();

  return (
    <StyledPaper
      aria-label="Info Box component"
      data-testid="infoBox-container"
    >
    </StyledPaper>
  );
};

export default InfoBox;

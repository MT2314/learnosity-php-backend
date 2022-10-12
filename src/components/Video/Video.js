import React, { useState, useRef, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";

// Interal Imports
import Body from "./subcomponents/Body";
import TriangleIcon from "./assests/Triangle.png";
// MUI/@emotion imports
import { Paper } from "@mui/material";

// ?Provider
import { VideoProvider } from "./VideoContext";

// Hook/utilities imports
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
// Localization import
import { useTranslation, Trans } from "react-i18next";

// Default props
export const defaultProps = {
  id: uuidv4(),
  type: "",
  videoURL: "",
  videoDescription: "",
  videoCredit: "",
};

//styled components for Accordion styles
const StyledVideoDefaultContainer = styled("div")({
  width: "760px",
  height: "427.5px",
  backgroundColor: "#EEEEEE",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledAccordionContainer = styled("div")({
  width: "100%",
  maxWidth: "60.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const StyledCircleContainer = styled("div")({
  width: "200px",
  height: "200px",
  outline: "5px solid #E0E0E0",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledTriangleImage = styled("img")({
  paddingLeft: "20px",
});

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
const Video = ({ videoState = defaultProps, setProp = () => {} }) => {
  // Localization
  const { t } = useTranslation();

  const [selectedIcon, setSelectedIcon] = useState(null);

  const [videoHasFocus, setVideoHasFocus] = useState(false);
  const [videoAreaFocused, setVideoAreaFocused] = useState(false);

  const [videoBody, setVideoBody] = useState(null);
  const [placeHolder, setPlaceHolder] = useState(null);

  const isVideo = useMemo(() => true, []);
  const videoRef = useRef();

  useOnClickOutside(videoRef, () => {
    setVideoHasFocus(false);
    setVideoAreaFocused(false);
  });

  const videoFocused = (e) => {
    setVideoAreaFocused(true);
    if (!videoBody.contains(e.target) && e.target !== placeHolder) {
      setVideoHasFocus(true);
    }
  };

  return (
    <VideoProvider videoState={videoState} setProp={setProp}>
      <StyledAccordionContainer
        aria-label={t("Video")}
        data-testid="video-container"
        ref={videoRef}
        onClick={(e) => videoFocused(e)}
        onFocus={(e) => videoFocused(e)}
      >
        <StyledVideoDefaultContainer>
          <StyledCircleContainer>
            <StyledTriangleImage src={TriangleIcon} />
          </StyledCircleContainer>
        </StyledVideoDefaultContainer>
        <StyledPaper>
          <StyledTextContainer>
            <Body
              isVideo={isVideo}
              videoHasFocus={videoHasFocus}
              infoAreaFocused={videoAreaFocused}
              setSelectedIcon={setSelectedIcon}
              setVideoHasFocus={setVideoHasFocus}
              setVideoBody={setVideoBody}
              setPlaceHolder={setPlaceHolder}
              t={t}
            />
          </StyledTextContainer>
        </StyledPaper>
      </StyledAccordionContainer>
    </VideoProvider>
  );
};

export default Video;

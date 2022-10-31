import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useContext,
} from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";

// Internal Imports
import VideoDescriptionCredit from "./VideoDescriptionCredit";
import Player from "./Player";
import Checkmark from "../../Video/assets/Checkmark";

// ?Provider
import Toolbar from "./Toolbar";

// Hook/utilities imports
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
// Localization import
import { useTranslation, Trans } from "react-i18next";
import { VideoContext } from "../VideoContext";

//styled components for Accordion styles

const StyledVideoContainer = styled("div")({
  width: "760px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  paddingTop: "30px",
  marginLeft: "104px",
  marginRight: "104px",
});

const StyledVideoDescriptionContainer = styled("div")({
  marginTop: "22px",
  display: "flex",
  gap: "30px",
  marginBottom: "30px",
});

const DescriptionCreditContainer = styled("div")({
  marginTop: "-20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const TranscriptButtonContainer = styled("button")(({ videoData }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "6px",
  height: "32px",
  width: "108px !important",
  padding: !videoData ? "7px 12.5px" : "6px 10px 6px 6px",
  backgroundColor: videoData ? "rgba(46, 125, 50, 1)" : "rgba(0, 0, 0, 0.08)",
  color: videoData ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.38)",
  border: "none",
  borderRadius: "16px",
  fontWeight: "400",
  fontSize: "13px",
  lineHeight: "18px",
  letterSpacing: "0.16px",
  textAlign: "center",
}));

// InfoBox component
const Video = () => {
  // Localization
  const { t } = useTranslation();

  const [state, dispatch] = useContext(VideoContext);
  const [videoHasFocus, setVideoHasFocus] = useState(false);
  const [videoAreaFocused, setVideoAreaFocused] = useState(false);

  const [videoBody, setVideoBody] = useState(null);
  const [placeHolder, setPlaceHolder] = useState(null);
  const [toolbar, setToolbar] = useState(null);

  const [videoAPI, setVideoAPI] = useState({
    videoSource: "",
    videoId: null,
  });

  const [videoTextSettings, setVideoTextSettings] = useState({
    description: null,
    credit: null,
  });

  const isVideo = useMemo(() => true, []);
  const videoRef = useRef();

  useOnClickOutside(videoRef, () => {
    setVideoHasFocus(false);
    setVideoAreaFocused(false);
  });

  const videoFocused = (e) => {
    console.log("VIDEO FOCUSED CLICKED/FOCUSED");
    setVideoAreaFocused(true);
  };

  const handleTextClick = useCallback((e) => {
    e.stopPropagation();
    setVideoAreaFocused(false);
  }, []);

  // Set videoAPI if value is set in state
  useMemo(() => {
    if (state.videoSource && state.videoId) {
      setVideoAPI({
        videoSource: state.videoSource,
        videoId: state.videoId,
      });
    }
    console.log(state.videoId);
  }, []);

  return (
    <div
      aria-label={t("Video")}
      data-testid="video-container"
      ref={videoRef}
      onClick={(e) => videoFocused(e)}
      onFocus={(e) => videoFocused(e)}
      onBlur={(e) => e.stopPropagation()}
    >
      <Toolbar
        isVideo={isVideo}
        videoAreaFocused={videoAreaFocused}
        setVideoAPI={setVideoAPI}
        videoAPI={videoAPI}
        setVideoTextSettings={setVideoTextSettings}
        setToolbar={setToolbar}
      />
      <Player videoId={videoAPI.videoId} videoSource={videoAPI.videoSource} />
      <StyledVideoContainer>
        <StyledVideoDescriptionContainer>
          <DescriptionCreditContainer>
            <div
              onClick={(e) => {
                handleTextClick(e);
              }}
              onFocus={(e) => {
                handleTextClick(e);
              }}
            >
              <VideoDescriptionCredit
                isVideo={isVideo}
                videoHasFocus={videoHasFocus}
                videoAreaFocused={videoAreaFocused}
                setVideoHasFocus={setVideoHasFocus}
                setVideoBody={setVideoBody}
                setPlaceHolder={setPlaceHolder}
                setVideoAPI={setVideoAPI}
                videoAPI={videoAPI}
                description={state.videoDescription}
                credit={state.videoCredit}
                toolbar={toolbar}
                setVideoAreaFocused={setVideoAreaFocused}
                t={t}
              />
            </div>
          </DescriptionCreditContainer>
          <TranscriptButtonContainer videoData={state.videoId ? true : false}>
            {state.videoId && <Checkmark />}
            <span>{state.videoId ? "Transcript" : "No Transcript"}</span>
          </TranscriptButtonContainer>
        </StyledVideoDescriptionContainer>
      </StyledVideoContainer>
    </div>
  );
};

export default Video;

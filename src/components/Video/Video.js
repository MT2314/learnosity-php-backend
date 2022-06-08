import React from "react";

import FormattedText from "../FormattedText/FormattedText";
import { useToolBarOptions } from "../../hooks/useToolBarOptions";

import YouTube from "react-youtube";
import ReactPlayerLoader from "@brightcove/react-player-loader";

import styles from "./styles/Video.module.scss";

export let defaultProps = {
  type: "",
};

const Video = ({
  type,
  videoId,
  brightcoveAccountId,
  caption,
  credit,
  transcript,
  setProp = () => console.warn("No state change function provided"),
}) => {
  // Setting the toolbar for FormattedTexts with custom hook
  // const creditToolbar = useToolBarOptions(
  //   ["inline", "textAlign", "list", "link"],
  //   ["bold", "italic", "underline", "strikethrough", "superscript", "subscript"]
  // );

  return (
    <div className={styles.videoContainer} data-testid="video">
      {type === "" ||
      (type === "brightcove" && !videoId) ||
      (type === "youTube" && !videoId) ? (
        <div className={styles.placeholderImg} tabIndex="0"></div>
      ) : type === "youTube" && videoId ? (
        <div className={styles.youTubePlayer} data-testid="youTubePlayer">
          <YouTube
            videoId={videoId}
            onError={(error) => console.log(error.data)}
          />
        </div>
      ) : type === "brightcove" && videoId ? (
        <div className={styles.brightcovePlayer} data-testid="brightcovePlayer">
          <ReactPlayerLoader accountId="23648095001" videoId={videoId} />
        </div>
      ) : null}
      {(type === "youTube" && videoId) || (type === "brightcove" && videoId) ? (
        <>
          <div
            className={styles.transcriptContainer}
            data-testid="videoTranscript"
          >
            <FormattedText
              placeHolderText="Type transcript here..."
              body={transcript}
              setProp={(stateUpdate) =>
                setProp({ transcript: stateUpdate.body })
              }
            />
          </div>
          <div className={styles.captionContainer} data-testid="videoCaption">
            <FormattedText
              placeHolderText="Type caption here..."
              body={caption}
              setProp={(stateUpdate) => setProp({ caption: stateUpdate.body })}
            />
          </div>
          <div className={styles.creditContainer} data-testid="videoCredit">
            <FormattedText
              placeHolderText="Type credit here..."
              body={credit}
              setProp={(stateUpdate) => setProp({ credit: stateUpdate.body })}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Video;

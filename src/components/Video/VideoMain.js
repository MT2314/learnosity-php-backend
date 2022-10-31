import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { VideoProvider } from "./VideoContext";
import Video from "./subcomponents/Video";

export const defaultProps = {
  videoState: {
    videoSource: null,
    videoURL: null,
    videoDescription: null,
    videoCredit: "",
    videoId: null,
  },
};

const VideoMain = ({ videoState = defaultProps, setProp = () => {} }) => {
  return (
    <VideoProvider videoState={videoState} setProp={setProp}>
      <Video />
    </VideoProvider>
  );
};

export default VideoMain;

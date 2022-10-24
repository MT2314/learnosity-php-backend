import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { VideoProvider } from "./VideoContext";
import Video from "./subcomponents/Video";

export const defaultProps = {
  type: "",
  videoURL: "",
  videoDescription: "",
  videoCredit: "",
  videoId: null,
};

const VideoMain = ({ videoState = defaultProps, setProp = () => {} }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <VideoProvider videoState={videoState} setProp={setProp}>
        <Video />
      </VideoProvider>
    </DndProvider>
  );
};

export default VideoMain;

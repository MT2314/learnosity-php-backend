import React from "react";
import { v4 as uuidv4 } from "uuid";
import { TabProvider } from "./subcomponents/TabContext";
import { VideoProvider } from "./VideoContext";
import Video from "./subcomponents/Video";

export const defaultProps = {
  videoState: {
    id: uuidv4(),
    videoSource: null,
    videoURL: null,
    videoDescription: null,
    videoCredit: null,
    videoId: null,
    videoTextSettings: {
      description: true,
      credit: true,
    },
  },
};

const VideoMain = ({ videoState = defaultProps, setProp = () => {} }) => {
  return (
    <VideoProvider videoState={videoState} setProp={setProp}>
      <TabProvider>
        <Video />
      </TabProvider>
    </VideoProvider>
  );
};

export default VideoMain;

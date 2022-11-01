import React from "react";
import { TabProvider } from "./subcomponents/TabContext";
import { VideoProvider } from "./VideoContext";
import Video from "./subcomponents/Video";

export const defaultProps = {
  videoState: {
    videoSource: null,
    videoURL: null,
    videoDescription: null,
    videoCredit: null,
    videoId: null,
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

import React from "react"
import { v4 as uuidv4 } from "uuid";

export const defaultProps = {
    id: uuidv4(),
    type: "",
    videoURL: "",
    videoDescription: "",
    videoCredit: ""
  };

const Video = () => {
    return (
        <h4>I am Video but I dont play</h4>
    )
}

export default Video
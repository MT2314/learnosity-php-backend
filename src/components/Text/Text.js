import React, { useState, useEffect } from "react";
import DefaultText from "./subcomponent/DefaultText";
import EditorComponent from "./subcomponent/EditorComponent";
import { Provider } from "./Provider";
import "./styles/Text.scss";

import PopupDialogs from "./dialogs/PopupDialogs";

import { CssBaseline } from "@mui/material";
import DragLabel from "../../Utility/DragLabel";
// import { ThemeProvider } from "@mui/material/styles";

//? PP Imports
// import createMFTheme from "../../theme/index";
import ReactQuillContainer from "../../theme/styledComponents/quillEditor";

export const defaultProps = { body: null };

const Text = ({
  setTabActive = () => {},
  body = { ops: [{ insert: "" }] },
  setProp = () => {},
  setActiveComponent = () => {},
  isActiveComponent = false,
  isInfoBox = false,
  infoAreaFocused = false,
  infoHasFocus = false,
  isVideo = false,
  videoHasFocus = false,
  videoAreaFocused = false,
  selectedIcon = null,
  setSelectedIcon = () => {},
  setInfoHasFocus = () => {},
  setVideoHasFocus = () => {},
  setTextRef = () => {},
  setVideoAPI = () => {},
  setVideoTextSettings = () => {},
  videoAPI = {},
  videoTextSettings = {},
  videoDesctiption
}) => {
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    if (isInfoBox || isVideo) {
      setShowEditor(true);
    }
  }, []);

  console.log(videoDesctiption)

  return (
    <>
      {/* on drag <DragLabel/> shows the components name */}
      <DragLabel />
      <CssBaseline />
      {/* <ThemeProvider theme={textTheme}> */}
      <ReactQuillContainer isInfoBox={isInfoBox} isVideo={isVideo}>
        {((!showEditor && body === null) ||
          (!showEditor && !body.ops) ||
          (!showEditor && body.ops[0].insert === "")) &&
        !isInfoBox &&
        !isVideo ? (
          <div
            onClick={() => {
              setShowEditor(true);
              setTabActive(true);
            }}
            className="mainContainer"
            data-testid="text-component"
            tabIndex="0"
            onFocus={() => {
              setShowEditor(true);
              setTabActive(true);
            }}
          >
            <DefaultText />
          </div>
        ) : (
          <Provider>
            <PopupDialogs />
            <EditorComponent
              body={body}
              setProp={setProp}
              setShowEditor={setShowEditor}
              showEditor={showEditor}
              setActiveComponent={setActiveComponent}
              isActiveComponent={isActiveComponent}
              isInfoBox={isInfoBox}
              isVideo={isVideo}
              infoAreaFocused={infoAreaFocused}
              videoAreaFocused={videoAreaFocused}
              selectedIcon={selectedIcon}
              infoHasFocus={infoHasFocus}
              videoHasFocus={videoHasFocus}
              setInfoHasFocus={setInfoHasFocus}
              setVideoHasFocus={setVideoHasFocus}
              setSelectedIcon={setSelectedIcon}
              setTextRef={setTextRef}
              setTabActive={setTabActive}
              setVideoAPI={setVideoAPI}
              videoAPI={videoAPI}
              videoTextSettings={videoTextSettings}
              setVideoTextSettings={setVideoTextSettings}
            />
          </Provider>
        )}
      </ReactQuillContainer>

      {/* </ThemeProvider> */}
    </>
  );
};

export default Text;

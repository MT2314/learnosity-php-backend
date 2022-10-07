import React, { useState, useEffect } from "react";
import DefaultText from "./subcomponent/DefaultText";
import EditorComponent from "./subcomponent/EditorComponent";
import { Provider } from "./Provider";
import "./styles/Text.scss";

import PopupDialogs from "./dialogs/PopupDialogs";

import { CssBaseline } from "@mui/material";
import DragLabel from "../../Utility/DragLabel"
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
  selectedIcon = null,
  setSelectedIcon = () => {},
  setInfoHasFocus = () => {},
  setTextRef = () => {},
}) => {
  const [showEditor, setShowEditor] = useState(false);

  //* Creating theme
  // const textTheme = createMFTheme();

  useEffect(() => {
    if (isInfoBox) {
      setShowEditor(true);
    }
  }, []);

  return (
    <>
    {/* on drag <DragLabel/> shows the components name */}
      <DragLabel/>
      <CssBaseline />
      {/* <ThemeProvider theme={textTheme}> */}
      <ReactQuillContainer isInfoBox={isInfoBox}>
        {((!showEditor && body === null) ||
          (!showEditor && !body.ops) ||
          (!showEditor && body.ops[0].insert === "")) &&
        !isInfoBox ? (
          <div
            onClick={() => {
              setShowEditor(true)
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
              infoAreaFocused={infoAreaFocused}
              selectedIcon={selectedIcon}
              infoHasFocus={infoHasFocus}
              setInfoHasFocus={setInfoHasFocus}
              setSelectedIcon={setSelectedIcon}
              setTextRef={setTextRef}
              setTabActive={setTabActive}
            />
          </Provider>
        )}
      </ReactQuillContainer>

      {/* </ThemeProvider> */}
    </>
  );
};

export default Text;

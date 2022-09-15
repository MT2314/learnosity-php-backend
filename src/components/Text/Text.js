import React, { useState, useEffect } from "react";
import DefaultText from "./subcomponent/DefaultText";
import EditorComponent from "./subcomponent/EditorComponent";
import { Provider } from "./Provider";
import "./styles/Text.scss";

import PopupDialogs from "./dialogs/PopupDialogs";

import { CssBaseline } from "@mui/material";
// import { ThemeProvider } from "@mui/material/styles";

//? PP Imports
// import createMFTheme from "../../theme/index";
import ReactQuillContainer from "../../theme/styledComponents/quillEditor";

export const defaultProps = { body: null };

const Text = ({
  body = { ops: [{ insert: "" }] },
  setProp = () => {},
  setActiveComponent = () => {},
  isActiveComponent = false,
  isInfoBox = false,
  closeToolbar = false,
  setCloseToolbar = () => {},
  infoHasFocus = false,
  selectedIcon = null,
  setSelectedIcon = () => {},
  setInfoHasFocus = () => {},
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
      <CssBaseline />
      {/* <ThemeProvider theme={textTheme}> */}
      <ReactQuillContainer isInfoBox={isInfoBox}>
        {((!showEditor && body === null) ||
          (!showEditor && !body.ops) ||
          (!showEditor && body.ops[0].insert === "")) &&
        !isInfoBox ? (
          <div
            onClick={() => {
              setShowEditor(true);
            }}
            className="mainContainer"
            data-testid="text-component"
            tabIndex="0"
            onFocus={() => {
              setShowEditor(true);
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
              closeToolbar={closeToolbar}
              selectedIcon={selectedIcon}
              infoHasFocus={infoHasFocus}
              setCloseToolbar={setCloseToolbar}
              setInfoHasFocus={setInfoHasFocus}
              setSelectedIcon={setSelectedIcon}
            />
          </Provider>
        )}
      </ReactQuillContainer>

      {/* </ThemeProvider> */}
    </>
  );
};

export default Text;

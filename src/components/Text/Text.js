import React, { useState, useRef } from "react";
import DefaultText from "./subcomponent/DefaultText";
import EditorComponent from "./subcomponent/EditorComponent";
import TextProvider from "./Provider";
import "./styles/Text.scss";

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
}) => {
  const [showEditor, setShowEditor] = useState(false);

  //* Creating theme
  // const textTheme = createMFTheme();

  return (
    <>
      <CssBaseline />
      {/* <ThemeProvider theme={textTheme}> */}
      <ReactQuillContainer>
        {(!showEditor && body === null) ||
        (!showEditor && !body.ops) ||
        (!showEditor && body.ops[0].insert === "") ? (
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
          <TextProvider>
            <EditorComponent
              body={body}
              setProp={setProp}
              setShowEditor={setShowEditor}
              showEditor={showEditor}
              setActiveComponent={setActiveComponent}
              isActiveComponent={isActiveComponent}
            />
          </TextProvider>
        )}
      </ReactQuillContainer>

      {/* </ThemeProvider> */}
    </>
  );
};

export default Text;

import React, { useState, useRef } from "react";
import DefaultText from "./subcomponent/DefaultText";
import EditorComponent from "./subcomponent/EditorComponent";
import "./styles/Text.scss";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

//? PP Imports
import createMFTheme from "../../theme/index";
import ReactQuillContainer from "../../theme/styledComponents/quillEditor";

export const defaultProps = { body: null };

const Text = ({ body = { ops: [{ insert: "" }] }, setProp = () => {} }) => {
  const [showEditor, setShowEditor] = useState(false);
  const focusOutofText = useRef(null);

  //* Creating theme
  const textTheme = createMFTheme();

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={textTheme}>
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
            <EditorComponent
              body={body}
              setProp={setProp}
              setShowEditor={setShowEditor}
              showEditor={showEditor}
              focusOutofText={focusOutofText.current}
            />
          )}
          <div
            className="sr-only"
            tabIndex="-1"
            ref={focusOutofText}
            onBlur={() => { 
              const removeFakeHover = document?.getElementsByClassName("fakeHover")[0];
              removeFakeHover?.classList.remove("fakeHover");
            }}
          >
            Exit Text Component
          </div>
        </ReactQuillContainer>
      </ThemeProvider>
    </>
  );
};

export default Text;

import React, { useState } from "react";
import DefaultText from "./subcomponent/DefaultText";
import EditorComponent from "./subcomponent/EditorComponent";
import "./styles/Text.scss";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

//* Theming styles
//? SaaS Imports
import createTheme from "saas/createTheme";

//? PP Imports
import createPPTheme from "../../theme/index";
import ReactQuillContainer from "../../theme/styledComponents/quillEditor";

export const defaultProps = { body: null };

const Text = ({ body = { ops: [{ insert: "" }] }, setProp = () => {} }) => {
  const [showEditor, setShowEditor] = useState(false);

  const handleOnClick = () => {
    setShowEditor(true);
  };
  const saasTheme = createTheme("DEFAULT");
  const textTheme = createPPTheme();
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={saasTheme}>
        <ThemeProvider theme={textTheme}>
          <ReactQuillContainer>
            {(!showEditor && body === null) ||
            (!showEditor && !body.ops) ||
            (!showEditor && body.ops[0].insert === "") ? (
              <div
                onClick={() => {
                  handleOnClick();
                }}
                className="mainContainer"
                data-testid="text-component"
              >
                <DefaultText />
              </div>
            ) : (
              <EditorComponent
                body={body}
                setProp={setProp}
                setShowEditor={setShowEditor}
              />
            )}
          </ReactQuillContainer>
        </ThemeProvider>
      </ThemeProvider>
    </>
  );
};

export default Text;

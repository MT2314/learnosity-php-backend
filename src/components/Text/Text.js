import React, { useState, useEffect, useRef } from "react";
import DefaultText from "./subcomponent/DefaultText";
import EditorComponent from "./subcomponent/EditorComponent";
import { Provider } from "./Provider";
import "./styles/Text.scss";

import PopupDialogs from "./dialogs/PopupDialogs";

import { CssBaseline } from "@mui/material";

import ReactQuillContainer from "../../theme/styledComponents/quillEditor";

import { useOnClickOutside } from "../../hooks/useOnClickOutside";

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
  portal = null,
}) => {
  const [showEditor, setShowEditor] = useState(false);
  const [closeToolBar, setCloseToolBar] = useState(false);

  const [closeText, setCloseText] = useState(true);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!portal?.shouldPortal) {
      setCloseToolBar(true);
    }
  }, [portal?.shouldPortal]);

  !portal &&
    useOnClickOutside(containerRef, () => {
      setCloseToolBar(true);
    });

  useEffect(() => {
    if (isInfoBox) {
      setShowEditor(true);
    }
    if (portal) {
      portal?.setTextContainer(containerRef.current);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <ReactQuillContainer
        isInfoBox={isInfoBox}
        isVideo={portal?.parentComponent === "video"}
        ref={containerRef}
      >
        {((!showEditor && body === null) ||
          (!showEditor && !body.ops) ||
          (!showEditor && body.ops[0].insert === "")) &&
        !isInfoBox ? (
          <div
            onClick={() => {
              setShowEditor(true);
              setTabActive(true);
              setCloseToolBar(false);
              setCloseText(false);
            }}
            className={
              portal?.parentComponent === "video" ? "" : "mainContainer"
            }
            data-testid="text-component"
            role="text"
            tabIndex="0"
            onFocus={() => {
              setShowEditor(true);
              setTabActive(true);
              setCloseToolBar(false);
              setCloseText(false);
            }}
          >
            <DefaultText portal={portal} />
          </div>
        ) : (
          <Provider>
            <PopupDialogs closeToolBar={closeToolBar} />
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
              closeToolBar={closeToolBar}
              setCloseToolBar={setCloseToolBar}
              portal={portal}
              setCloseText={setCloseText}
            />
          </Provider>
        )}
      </ReactQuillContainer>

      {/* </ThemeProvider> */}
    </>
  );
};

export default Text;

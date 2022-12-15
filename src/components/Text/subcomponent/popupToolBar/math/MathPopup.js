import React from "react";
import MathpixEqation from "./MathpixOptions/MathpixEquation";
import MathPixDraw from "./MathpixOptions/MathpixDraw/MathpixDraw";
import { useMathpixOption } from "../../../Provider";
import ImageConversion from "./ImageConversion/ImageConversion";


const MathPopup = ({ mathOption }) => {

  const insertQuill = (input) => {
    const quill = focusRef.current.getEditor();

    const range = quill.getSelection(true);
    quill.removeFormat(range.index, range.length);
    quill.insertEmbed(range.index, "latex", input);
    quill.insertText(range.index + range.length + 1, " ");
    quill.setSelection(range.index + range.length + 1);
  };

  return (
    <>
      {mathOption === "equationKeyboard" && (
        <MathpixEqation />
      )}
      {mathOption === "mathDraw" && (
        <ImageConversion />
      )}
      {mathOption === "imageConversion" && (
        <ImageConversion />
      )}

{/* <MathPixDraw
          closeDragAndDrop={closeDragAndDrop}
          insertQuill={insertQuill}
        /> */}
    </>
  );
};

export default MathPopup;

import React from "react";
import MathpixEqation from "./MathpixOptions/MathpixEquation";
import { useMathpixOption } from "../../../Provider";
import MathpixDraw from "./MathpixOptions/MathpixDraw/MathpixDraw";


const MathPopup = ({ mathOption }) => {

  

  return (
    <>
      {mathOption === "equationKeyboard" && (
        <MathpixEqation />
      )}
      {mathOption === "mathDraw" && (
        <MathpixDraw />
      )}
      {mathOption === "imageConversion" && (
        <ImageConversion />
      )}
    </>
  );
};

export default MathPopup;

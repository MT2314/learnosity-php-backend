import React from "react";
import MathpixEqation from "./MathpixOptions/MathpixEquation";

const MathPopup = ({ mathOption }) => {
  return (
    <>
      {mathOption === "equationKeyboard" && (
        <MathpixEqation />
      )}
      {mathOption === "mathDraw" && (
        <h4>helllllo</h4>
      )}
    </>
  );
};

export default MathPopup;

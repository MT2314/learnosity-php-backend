import React, { useRef } from "react";
import { Canvas } from "./canvas/Canvas";

import { useOnClickOutside } from "../../../../../../../hooks/useOnClickOutside";

const mainContainer = {
  position: "fixed",
  width: "825px",
  height: "contain",
  border: "1px solid black",
  zIndex: 5000,
  top: "5%",
  padding: "25px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "10px",
};

const MathPixDraw = ({ closeDragAndDrop, insertQuill }) => {
  const containerRef = useRef(null);
  useOnClickOutside(containerRef, closeDragAndDrop);
  return (
    <div style={mainContainer} ref={containerRef}>
      <Canvas closeDragAndDrop={closeDragAndDrop} insertQuill={insertQuill} />
    </div>
  );
};

export default MathPixDraw;

import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext";
import {
  ClearCanvasButton,
  LatexRenderer,
  UndoButton,
  RedoButton,
  CopyToClipboardButton,
} from "./Utils";
import "./canvas.css";
import { CanvasProvider } from "./CanvasContext";

function CanvasInternal() {
  const { canvasRef, prepareCanvas } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <div className="canvas-draw-container">
      <canvas ref={canvasRef} className="canvas-draw" />
    </div>
  );
}

export function Canvas({ closeDragAndDrop, insertQuill }) {
  return (
    <CanvasProvider>
      <LatexRenderer />
      <div className="canvas-buttons-container">
        <ClearCanvasButton />
        <UndoButton />
        <RedoButton />
      </div>
      <CanvasInternal />
      <CopyToClipboardButton
        closeDragAndDrop={closeDragAndDrop}
        insertQuill={insertQuill}
      />
    </CanvasProvider>
  );
}

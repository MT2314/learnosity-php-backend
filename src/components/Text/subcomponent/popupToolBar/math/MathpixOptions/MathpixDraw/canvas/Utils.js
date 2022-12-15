import React from "react";
import { useCanvas } from "./CanvasContext";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import { IconButton } from "@mui/material";
import { DeleteOutline, UndoOutlined, RedoOutlined } from "@mui/icons-material";

import Tooltip from "@mui/material/Tooltip";
import "./canvas.css";

export const ClearCanvasButton = () => {
  const { clearCanvas, strokes } = useCanvas();
  const handleClick = () => {
    clearCanvas(false);
  };
  return (
    <Tooltip title="Clear Drawing">
      <IconButton
        onClick={handleClick}
        disabled={strokes.length === 0}
        color="primary"
      >
        <div className="canvas-buttons">
          <DeleteOutline fontSize="inherit" />
        </div>
      </IconButton>
    </Tooltip>
  );
};

export const LatexRenderer = () => {
  const { latex } = useCanvas();
  return (
    <div className="latex-renderer-container">
      <MathpixLoader>
        <MathpixMarkdown text={latex.code} />
      </MathpixLoader>
    </div>
  );
};

export const UndoButton = () => {
  const { undoHistory, undo } = useCanvas();
  const handleClick = () => {
    undo();
  };

  return (
    <Tooltip title="Undo">
      <IconButton
        onClick={handleClick}
        disabled={undoHistory.length === 0}
        color="primary"
      >
        <div className="canvas-buttons">
          <UndoOutlined fontSize="inherit" />
        </div>
      </IconButton>
    </Tooltip>
  );
};

export const RedoButton = () => {
  const { redoHistory, redo } = useCanvas();
  const handleClick = () => {
    redo();
  };

  return (
    <Tooltip title="Redo">
      <IconButton
        onClick={handleClick}
        disabled={redoHistory.length === 0}
        color="primary"
      >
        <div className="canvas-buttons">
          <RedoOutlined fontSize="inherit" />
        </div>
      </IconButton>
    </Tooltip>
  );
};

const container = {
  display: "flex",
  flexDirection: "row",
};

export const CopyToClipboardButton = ({ closeDragAndDrop, insertQuill }) => {
  const { latex, setUndoHistory } = useCanvas();
  const handleClick = () => {
    const latexCode = latex.code.substring(2, latex.code.length - 2);
    setUndoHistory([]);
    insertQuill(latexCode);
    closeDragAndDrop();
  };

  return (
    <div style={container}>
      <button
        onClick={handleClick}
        disabled={latex.isPlaceholder}
        color="primary"
        className="insert-button"
      >
        Insert
      </button>
    </div>
  );
};

import React from "react";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import { IconButton } from "@mui/material";
import { DeleteOutline, UndoOutlined, RedoOutlined } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { useCanvas } from "./CanvasContext";
import { useQuill, useSetShowMath } from "../../../../../../Provider";

import "./canvas.scss";
import {
  CanvasUndo,
  CanvasRedo,
  CanvasDelete,
  CanvasDraw,
} from "../../../../../../assets/icons";

export const ClearCanvasButton = () => {
  const { clearCanvas, strokes } = useCanvas();
  const handleClick = () => {
    clearCanvas(false);
  };
  return (
    <Tooltip title="Clear Drawing">
      <IconButton
        disableRipple
        onClick={handleClick}
        disabled={strokes.length === 0}
        color="primary"
      >
        {CanvasDelete}
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
        disableRipple
        onClick={handleClick}
        disabled={undoHistory.length === 0}
        color="primary"
      >
        {CanvasUndo}
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
        disableRipple
        onClick={handleClick}
        disabled={redoHistory.length === 0}
        color="primary"
      >
        {CanvasRedo}
      </IconButton>
    </Tooltip>
  );
};

export const CanvasPlaceholder = () => {
  const { placeholderText } = useCanvas();
  return (
    <div
      className="CanvasPlaceholder"
      style={!placeholderText ? { display: "none" } : { display: "flex" }}
    >
      {CanvasDraw}
      <span>Start drawing here</span>
    </div>
  );
};

export const CopyToClipboardButton = () => {
  const { latex, setUndoHistory } = useCanvas();
  const setMathShow = useSetShowMath();

  const quill = useQuill();
  const insertQuill = (input) => {
    const range = quill.getSelection(true);
    quill.removeFormat(range.index, range.length);
    quill.insertEmbed(range.index, "mathpix", input);
    quill.insertText(range.index + range.length + 1, " ");
    quill.setSelection(range.index + range.length + 1);
  };
  const handleClick = () => {
    const latexCode = latex.code.substring(2, latex.code.length - 2);
    setUndoHistory([]);
    insertQuill(latexCode);
    setMathShow(false);
  };

  return (
    <div className="Insert-Button">
      <button
        onClick={handleClick}
        disabled={latex.isPlaceholder}
        color="primary"
        className="insert-button"
      >
        {"Insert"}
      </button>
    </div>
  );
};

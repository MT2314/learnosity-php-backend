import React, { useRef, useState, useEffect } from "react";
import { useDrag, useDragDropManager } from "react-dnd";
import CloseIcon from "@mui/icons-material/Close";

import {
    useUniqueId,
    useSetShowMath,
    useEditFormula,
    useSetEditFormula,
} from "../../../../Provider";

import { useCanvas } from "../MathpixOptions/MathpixDraw/canvas/CanvasContext";

import {
    ClearCanvasButton,
    LatexRenderer,
    UndoButton,
    RedoButton,
    CopyToClipboardButton,
} from "../MathpixOptions/MathpixDraw/canvas/Utils";

import { useOnClickOutside } from "../../../../../../hooks/useOnClickOutside";
import { CanvasProvider } from "../MathpixOptions/MathpixDraw/canvas/CanvasContext";
import "../MathpixOptions/MathpixDraw/canvas/canvas.css"


const ImageConversion = () => {
    const containerRef = useRef(null);
    const uniqueId = useUniqueId();
    const editFormula = useEditFormula();
    const setMathShow = useSetShowMath();
    const setEditFormula = useSetEditFormula();


    const [coords, setCoords] = useState(null);

    const closeMath = () => {
        setEditFormula({ value: null, id: null });
        setMathShow(false);
    };

    useOnClickOutside(containerRef, closeMath);

    const [{ isDragging }, drag, preview] = useDrag({
        type: "math",
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            offset: monitor.getSourceClientOffset(),
        }),
    });

    const dragDropManager = useDragDropManager();
    const monitor = dragDropManager.getMonitor();

    const CanvasInternal = () => {
        const { canvasRef, prepareCanvas } = useCanvas();

        useEffect(() => {
            prepareCanvas();
        }, []);

        return (
            <div className="canvas-draw-container">
                <canvas ref={canvasRef} className="canvas-draw" />
                <div className="canvas-buttons-container">
                    <UndoButton />
                    <RedoButton />
                    <ClearCanvasButton />
                </div>
            </div>
        );
    }

    useEffect(
        () =>
            monitor.subscribeToOffsetChange(() => {
                const offset = monitor.getClientOffset();
                offset && setCoords(offset);
            }),
        [monitor]
    );

    return (
        <div
            style={{
                position: "fixed",
                width: "592px",
                top: coords ? `${coords.y}px` : "165px",
                left: coords ? `${coords.x}px` : "50%",
                transform: "translateX(-50%)",
                zIndex: 2000,
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                borderTop: "4px solid #1565C0",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
            }}
            ref={drag(containerRef)}
            tabIndex={0}
            autoFocus
            aria-label="virtual keyboard"
            id={`mathpopup-${uniqueId}`}
            role="math"
            className="MathEquationKeyboard"
            onKeyDown={(e) => {
                if (e.key === "Escape") {
                    closeMath();
                }
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: "18px",
                    paddingLeft: "16px",
                    borderBottom: "1px solid #E0E0E0",
                    "& span": {
                        marginTop: "4px",
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "14px",
                        lineHeight: "157%",
                        color: "#232323",
                    },
                }}
            >
                <span>Convert Drawing into an equation</span>
                <button
                    aria-label="close math popup"
                    style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        padding: "0px 21.18px 16px 0px",
                    }}
                    onClick={closeMath}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            closeMath();
                        }
                    }}
                    tabIndex={0}
                >
                    {" "}
                    <CloseIcon />
                </button>
            </div>
            <div
                style={{
                    margin: "16px 16px 0px 16px"
                }}>
                <CanvasProvider>
                    <LatexRenderer />
                    <CanvasInternal />
                    <div className="insert-button-container">
                        <CopyToClipboardButton />
                    </div>

                </CanvasProvider >
            </div>
        </div >
    )
}

export default ImageConversion
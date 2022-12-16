import React, { useState, useEffect, useContext, useRef } from "react";
import { LayoutContext } from "../TableContext";

// react-table imports
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import { Paper, TextareaAutosize } from "@material-ui/core";

// react-dnd imports
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Toolbar from "./Toolbar";

// Hook/utilities imports
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

// Styled import
import styled from "@emotion/styled";
import "../styles/TableComponent.scss";

// Styled components
const StyledTable = styled("table")(({ showStripes, headerType, tableId }) => ({
  "tr:nth-of-type(odd):not(:first-of-type)": {
    backgroundColor: headerType === "top-header" && showStripes && "#F5F5F5",
  },
  "tr:nth-of-type(even)": {
    backgroundColor: headerType === "side-header" && showStripes && "#F5F5F5",
  },
}));

const StyledTd = styled("td")(({ selectHighlight, titleType }) => ({
  border: selectHighlight ? "1px double #1565C0" : "1px solid #232323",
  backgroundColor: titleType
    ? selectHighlight
      ? "rgba(226,230,234,255)"
      : "#EEEEEE"
    : selectHighlight
    ? "rgba(21, 101, 192, 0.08)"
    : "",
}));

const StyledInput = styled(TextareaAutosize)(
  ({ type, horizontalAlignment, verticalAlignment }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding:
      type === "title" && verticalAlignment === "top-align"
        ? "15px 10px 35px 10px"
        : type === "title" && verticalAlignment === "middle-align"
        ? "25px 10px"
        : type === "title" && verticalAlignment === "bottom-align"
        ? "35px 10px 15px 10px"
        : type === "cell" && verticalAlignment === "top-align"
        ? "10px 10px 30px 10px"
        : type === "cell" && verticalAlignment === "middle-align"
        ? "20px 10px"
        : type === "cell" && verticalAlignment === "bottom-align"
        ? "30px 10px 10px 10px"
        : "20px 10px",
    fontSize: type === "title" ? "18px" : "16px",
    fontWeight: type === "title" ? "500" : "400",
    ...(type === "title" && { textAlign: "center", textOverflow: "ellipsis" }),
    // ...(type === "cell" && { padding: "15px" }),
    textAlign:
      horizontalAlignment === "left-align"
        ? "left"
        : horizontalAlignment === "right-align"
        ? "right"
        : horizontalAlignment === "center-align"
        ? "center"
        : type === "title" && horizontalAlignment === "center-align"
        ? "center"
        : "left",
  })
);

const StyledConfigBar = styled("div")({});

// Filter SelectSection string to return aria-label
const ariaSection = (selection) => {
  let readOut;
  if (selection?.charAt(0) === "c") {
    readOut = `column ${selection?.replace(/[^0-9]/g, "")}`;
  } else {
    readOut = `row ${+selection?.replace(/[^0-9]/g, "") + 1}`;
  }

  return readOut;
};

const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
  );
  return [...columnOrder];
};

const DraggableColumnHeader = ({
  header,
  table,
  selectSection,
  setSelectSection,
  toolbarRef,
}) => {
  const [state, dispatch] = useContext(LayoutContext);
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [, dropRef] = useDrop({
    accept: "column",
    drop: (draggedColumn) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );

      setColumnOrder(newColumnOrder);

      dispatch({
        func: "UPDATE_COLUMN_ORDER",
        draggedColumn: draggedColumn.id,
        targetColumn: column.id,
      });
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });

  return (
    <th
      ref={dropRef}
      colSpan={header.colSpan}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: "#DEE7F5",
        ...(column.id === "column1" &&
          state.hideSideHeader && { display: "none" }),
      }}
    >
      <div
        ref={previewRef}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        <button
          ref={dragRef}
          onFocus={(e) => {
            setSelectSection(header.id);
          }}
          onBlur={(e) => {
            const relatedTarget = e.relatedTarget || document.activeElement;
            if (!toolbarRef.contains(relatedTarget)) {
              setSelectSection(null);
            }
          }}
          aria-label={`${ariaSection(selectSection)} drag icon`}
          className="drag-indicator-icon-btn"
        >
          <DragIndicatorIcon />
        </button>
      </div>
    </th>
  );
};

const DraggableRow = ({
  row,
  reorderRow,
  setSelectSection,
  setSelectedCell,
  selectSection,
  selectedCell,
  toolbarRef,
  handleAriaLive,
}) => {
  const [state, dispatch] = useContext(LayoutContext);

  const [, dropRef] = useDrop({
    accept: "row",
    drop: (draggedRow) => reorderRow(draggedRow.index, row.index),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: "row",
  });

  const renderTextArea = (value, row, col, type) => {
    const onTextChange = (e) => {
      dispatch({
        func: "UPDATE_CELL",
        row,
        col,
        value: e.target.value,
      });
    };

    const setCell = (e) => {
      setSelectedCell({ row, col });
    };

    return (
      <StyledInput
        value={value || ""}
        aria-label={type === "title" ? `Header input` : "Table cell input"}
        className="styled-input"
        placeholder={
          type === "title"
            ? `Title ${state.headerType === "top-header" ? col + 1 : row + 1}`
            : "Lorem ipsum"
        }
        data-row={row}
        data-col={col}
        type={type}
        horizontalAlignment={
          state.data[row][`column${col + 1}`].horizontalAlignment !== undefined
            ? state.data[row][`column${col + 1}`].horizontalAlignment
            : type === "title"
            ? "center-align"
            : "left-align"
        }
        verticalAlignment={
          state.data[row][`column${col + 1}`].verticalAlignment !== undefined
            ? state.data[row][`column${col + 1}`].verticalAlignment
            : "middle-align"
        }
        onChange={onTextChange}
        onFocus={setCell}
        onClick={setCell}
        onBlur={(e) => {
          const relatedTarget = e.relatedTarget || document.activeElement;
          if (!toolbarRef.contains(relatedTarget)) {
            setSelectedCell(null);
          }
        }}

        // onKeyDown={(e) => {
        //   if (e.key === "Enter" && type === "title") {
        //     e.preventDefault();
        //   }
        // }}
      />
    );
  };

  return (
    <tr
      ref={previewRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <td
        style={{
          ...(row.original.column1.type === "title" &&
            state.hideTopHeader && { display: "none" }),
          backgroundColor: "#DEE7F5",
        }}
      >
        <span ref={dropRef} className="draggable-row-span">
          <button
            ref={dragRef}
            onFocus={(e) => {
              setSelectSection(row.id);
            }}
            onBlur={(e) => {
              const relatedTarget = e.relatedTarget || document.activeElement;
              if (!toolbarRef.contains(relatedTarget)) {
                setSelectSection(null);
                setSelectedCell(null);
              }
            }}
            aria-label={`${ariaSection(selectSection)} drag icon`}
            className="drag-indicator-icon-btn"
          >
            <DragIndicatorIcon />
          </button>
        </span>
      </td>
      {row.getVisibleCells().map((cell) => {
        const type = cell.row.original[cell.column.id].type;
        return (
          <StyledTd
            selectHighlight={
              selectSection === cell.column.id || selectSection === row.id
            }
            titleType={type == "title"}
            className="styled-td"
            key={cell.id}
            data-testid={`row${cell.row.index + 1}-${cell.column.id}`}
            style={{
              ...(type == "title" &&
                (state.hideSideHeader || state.hideTopHeader) && {
                  display: "none",
                }),
            }}
            align="center"
            onFocus={(e) => {
              // Column title at index
              let columnTitle =
                state.data[0][
                  `column${parseInt(cell.column.id.replace("column", ""))}`
                ].value === ""
                  ? `Title${parseInt(cell.column.id.replace("column", ""))}`
                  : state.data[0][
                      `column${parseInt(cell.column.id.replace("column", ""))}`
                    ].value;

              // row Title at index
              let rowTitle =
                state.data[cell.row.index][`column1`].value === ""
                  ? `Title ${cell.row.index}`
                  : state.data[cell.row.index][`column1`].value;

              // cell at index with blank value
              let mycell = `${
                cell.row.original[cell.column.id].value === ""
                  ? "empty cell"
                  : cell.row.original[cell.column.id].value
              }`;

              let cellAria = `${
                type === "title" && state.headerType === "side-header"
                  ? `Row ${cell.row.index + 1} ${mycell}
                    )}`
                  : type === "title" && state.headerType === "top-header"
                  ? `Column ${parseInt(
                      cell.column.id.replace("column", "")
                    )} ${mycell}`
                  : state.headerType === "top-header"
                  ? `${columnTitle} column ${parseInt(
                      cell.column.id.replace("column", "")
                    )} ${mycell}`
                  : `${rowTitle} row ${mycell}`
              }`;

              handleAriaLive(cellAria);
            }}
          >
            {renderTextArea(
              cell.row.original[cell.column.id].value,
              cell.row.index,
              parseInt(cell.column.id.replace("column", "")) - 1,
              type
            )}
          </StyledTd>
        );
      })}
    </tr>
  );
};

const TableComponent = ({ tableId }) => {
  const [state, dispatch] = useContext(LayoutContext);
  const [toolbar, setToolbar] = useState(false);
  const [selectSection, setSelectSection] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [toolbarRef, setToolbarRef] = useState(null);
  const tableRef = useRef();

  // Aria Live
  const [ariaLive, setAriaLive] = useState("");
  const [ariaLive2, setAriaLive2] = useState("");

  // Handle Aria live region
  const handleAriaLive = (value) => {
    if (ariaLive === value) {
      setAriaLive("");
      setAriaLive2(value);
    } else {
      setAriaLive2("");
      setAriaLive(value);
    }
  };

  useOnClickOutside(tableRef, () => {
    setToolbar(false);
    setSelectSection(null);
    setSelectedCell(null);
  });

  const [columnOrder, setColumnOrder] = useState(
    state.headers.map((column) => column.id)
  );

  const reorderRow = (draggedRowIndex, targetRowIndex) => {
    dispatch({
      func: "UPDATE_ROW",
      draggedRowIndex,
      targetRowIndex,
    });
  };

  const table = useReactTable(
    {
      data: state.data,
      columns: state.headers,
      state: {
        columnOrder,
      },
      onColumnOrderChange: setColumnOrder,
      getCoreRowModel: getCoreRowModel(),
      getRowId: (row) => row.name,
      debugTable: true,
      debugHeaders: true,
      debugColumns: true,
    },
    [state, columnOrder]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <span
        className="sr-only"
        role="status"
        aria-live="assertive"
        aria-relevant="all"
        aria-atomic="true"
      >
        {ariaLive}
      </span>
      <span
        className="sr-only"
        role="status"
        aria-live="assertive"
        aria-relevant="all"
        aria-atomic="true"
      >
        {ariaLive2}
      </span>
      <StyledTable
        role="presentation"
        className="style-table"
        aria-label={`Table with ${state.data.length} rows and ${state.headers.length} columns.`}
        onFocus={(e) => {
          setToolbar(true);
        }}
        onClick={(e) => setToolbar(true)}
        ref={tableRef}
        showStripes={state.showStripes}
        headerType={state.headerType}
      >
        <span className="sr-only" tabIndex={0}>
          {`Table with ${state.data.length} rows and ${state.headers.length} columns focused`}
        </span>
        <StyledConfigBar className="styled-config-bar">
          <Toolbar
            setSelectSection={setSelectSection}
            selectSection={selectSection}
            setSelectedCell={setSelectedCell}
            selectedCell={selectedCell}
            toolbar={toolbar}
            setToolbarRef={setToolbarRef}
            toolbarRef={toolbarRef}
            tableId={tableId}
            handleAriaLive={handleAriaLive}
          />
        </StyledConfigBar>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th style={{ width: "30px" }} aria-label=""></th>
              {headerGroup.headers.map((header) => (
                <DraggableColumnHeader
                  key={header.id}
                  len={table.length}
                  header={header}
                  table={table}
                  selectSection={selectSection}
                  setSelectSection={setSelectSection}
                  toolbarRef={toolbarRef}
                />
              ))}
            </tr>
          ))}
        </thead>
        <tbody aria-hidden="true">
          {table.getRowModel().rows.map((row) => (
            <DraggableRow
              key={row.id}
              row={row}
              reorderRow={reorderRow}
              setSelectSection={setSelectSection}
              selectSection={selectSection}
              setSelectedCell={setSelectedCell}
              selectedCell={selectedCell}
              toolbarRef={toolbarRef}
              handleAriaLive={handleAriaLive}
            ></DraggableRow>
          ))}
        </tbody>
      </StyledTable>
    </DndProvider>
  );
};

export const defaultProps = {};

export default TableComponent;

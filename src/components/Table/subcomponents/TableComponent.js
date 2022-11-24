import React, { useState, useContext } from "react";
import { LayoutContext } from "../TableContext";

// react-table imports
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import TextareaAutosize from "@mui/base/TextareaAutosize";

// react-dnd imports
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Styled import
import styled from "@emotion/styled";

const defaultColumns = [
  {
    accessorKey: "column1",
    id: "column1",
    header: "",
  },
  {
    accessorKey: "column2",
    id: "column2",
    header: "",
  },
  {
    accessorKey: "column3",
    id: "column3",
    header: "",
  },
  {
    accessorKey: "column4",
    id: "column4",
    header: "",
  },
];

const defaultData = [
  {
    column1: { value: "", type: "cell" },
    column2: { value: "", type: "cell" },
    column3: { value: "", type: "cell" },
    column4: { value: "", type: "cell" },
  },
  {
    column1: { value: "", type: "cell" },
    column2: { value: "", type: "cell" },
    column3: { value: "", type: "cell" },
    column4: { value: "", type: "cell" },
  },
  {
    column1: { value: "", type: "cell" },
    column2: { value: "", type: "cell" },
    column3: { value: "", type: "cell" },
    column4: { value: "", type: "cell" },
  },
  {
    column1: { value: "", type: "cell" },
    column2: { value: "", type: "cell" },
    column3: { value: "", type: "cell" },
    column4: { value: "", type: "cell" },
  },
];

// Styled components
const StyledTable = styled("table")({
  // border: "0.0625rem solid lightgray",
  borderCollapse: "collapse",
  borderSpacing: "0",
  tableLayout: "fixed",
  width: "100%",
});

const StyledTd = styled("td")({
  border: "1px solid black",
  minHeight: "100px",
});

const StyledInput = styled(TextareaAutosize)(({ type }) => ({
  fontFamily: '"Inter", sans-serif',
  border: "none",
  padding: "10px",
  fontSize: type === "title" ? "18px" : "16px",
  fontWeight: type === "title" ? "500" : "400",
  lineHeight: "1.575rem",
  width: "100%",
  minHeight: type === "title" ? "57px" : "25px",
  height: "auto !important",
  ...(type === "title" && { textAlign: "center", textOverflow: "ellipsis" }),
  ...(type === "cell" && { padding: "15px" }),
  resize: "none",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  backgroundColor: "transparent",

  "&::-webkit-scrollbar": {
    WebkitAppearance: "none",
    width: "7px",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "4px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    boxShadow: "0 0 1px rgba(255, 255, 255, 0.5)",
    WebkitBoxShadow: "0 0 1px rgba(255, 255, 255, 0.5)",
  },
  "&:disabled": {
    background: "#f5f5f5",
  },
  "&::placeholder": {
    color: "rgba(35,35,35,1)",
  },
  "&:focus": {
    border: "none",
    outline: "none",
    "&:: placeholder": {
      color: "rgba(35, 35, 35, 0.12)",
    },
  },
}));

const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
  );
  return [...columnOrder];
};

const DraggableColumnHeader = ({ header, table, setColumnUpdate }) => {
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
      style={{ opacity: isDragging ? 0.5 : 1, backgroundColor: "#DEE7F5" }}
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
          aria-label="Header drag icon button"
          style={{
            background: "none",
            color: "inherit",
            border: "none",
            padding: 0,
            font: "inherit",
            cursor: "pointer",
          }}
        >
          <DragIndicatorIcon />
        </button>
      </div>
    </th>
  );
};

const DraggableRow = ({ row, reorderRow, len }) => {
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
    return (
      <StyledInput
        value={value || ""}
        aria-label={type === "title" ? `Header input` : "Table cell input"}
        placeholder={
          type === "title"
            ? `Title ${state.headerType === "top-header" ? col + 1 : row + 1}`
            : "Lorem ipsum"
        }
        type={type}
        onChange={onTextChange}
      />
    );
  };

  return (
    <tr ref={previewRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <td style={{ backgroundColor: "#DEE7F5" }}>
        <span
          ref={dropRef}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            ref={dragRef}
            aria-label="Header drag icon button"
            style={{
              background: "none",
              color: "inherit",
              border: "none",
              padding: 0,
              font: "inherit",
              cursor: "pointer",
            }}
          >
            <DragIndicatorIcon />
          </button>
        </span>
      </td>
      {row.getVisibleCells().map((cell) => {
        const type = cell.row.original[cell.column.id].type;
        const center = {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        };
        return (
          <StyledTd
            key={cell.id}
            data-testid={`row${cell.row.index + 1}-${cell.column.id}`}
            style={{
              backgroundColor: type == "title" ? "#EEEEEE" : "#FFFFFF",
              verticalAlign: type == "title" ? "middle" : "top",
            }}
            align="center"
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

const TableComponent = () => {
  const [state, dispatch] = useContext(LayoutContext);

  const [columnOrder, setColumnOrder] = useState(
    state.headers.map((column) => column.id)
  );

  const [columnUpdate, setColumnUpdate] = useState(false);

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
      <StyledTable role="presentation">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th
                style={{ width: "30px" }}
                aria-label=""
                aria-hidden="true"
              ></th>
              {headerGroup.headers.map((header) => (
                <DraggableColumnHeader
                  key={header.id}
                  len={table.length}
                  header={header}
                  table={table}
                  setColumnUpdate={setColumnUpdate}
                />
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <DraggableRow
              key={row.id}
              row={row}
              reorderRow={reorderRow}
            ></DraggableRow>
          ))}
        </tbody>
      </StyledTable>
    </DndProvider>
  );
};

export const defaultProps = {};

export default TableComponent;
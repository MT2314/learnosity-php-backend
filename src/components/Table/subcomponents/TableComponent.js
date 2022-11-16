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

const StyledTh = styled("th")({
  width: "auto",
});

const StyledTBody = styled("tbody")({
  // borderBottom: "0.0625rem solid lightgray",
});

const StyledTd = styled("td")({
  border: "1px solid black",
  // padding: "0.125rem 0.25rem",
  verticalAlign: "top",
  minHeight: "100px",

  // "&:last-child": {
  //   borderRight: "none",
  // },
});

const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
  );
  return [...columnOrder];
};

const DraggableColumnHeader = ({ header, table, len }) => {
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
      // dispatch({
      //   func: "UPDATE_COLUMN_ORDER",
      //   draggedColumnIndex: draggedColumn.id,
      //   targetColumnIndex: column.id,
      // });
      dispatch({
        func: "UPDATE_COLUMN_DATA",
        column: table.options.columns,
        data: table.options.data,
      });

      console.log("log ", table);
      console.log("log ", table.getAllFlatColumns());
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
      style={{ opacity: isDragging ? 0.5 : 1, backgroundColor: "lightgray" }}
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

  const renderTextArea = (value, row, col) => {
    const onTextChange = (e) => {
      dispatch({
        func: "UPDATE_CELL",
        row,
        col,
        value: e.target.value,
      });
    };
    return (
      <TextareaAutosize
        value={value || ""}
        placeholder="Lorem ipsum dolor"
        onChange={onTextChange}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          resize: "none",
        }}
      />
    );
  };

  return (
    <tr ref={previewRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <td style={{ backgroundColor: "lightgray" }}>
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
      {row.getVisibleCells().map((cell, index) => (
        <StyledTd key={cell.id}>
          {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
          {/* {console.log(
            flexRender(cell.column.columnDef.cell, cell.getContext())
            cell.column.id
            cell.row.original[cell.column.id]
            typeof cell.row.original[cell.column.id]
          )} */}
          {/* {index === 0 && (
            <span ref={dropRef}>
              <button
                ref={dragRef}
                style={{
                  background: "lightgray",
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
          )} */}
          {/* {console.log({
            column: parseInt(cell.column.id.replace("column", "")),
          })} */}
          {console.log({ index })}
          {cell.row.original[cell.column.id].type === "cell"
            ? renderTextArea(
                cell.row.original[cell.column.id].value,
                cell.row.index,
                parseInt(cell.column.id.replace("column", "")) - 1
              )
            : flexRender(cell.column.columnDef.cell, cell.getContext())}
        </StyledTd>
      ))}
    </tr>
  );
};

const TableComponent = () => {
  const [state, dispatch] = useContext(LayoutContext);

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

  React.useEffect(() => {
    console.log("data", state.data);
  }, []);

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
    [state]
  );

  React.useEffect(() => {
    // const diff =
    //   JSON.stringify(state.data) !== JSON.stringify(table.options.data);
    // const diff2 =
    //   JSON.stringify(state.headers) !== JSON.stringify(table.options.columns);
    // if (diff || diff2) {
    dispatch({
      func: "UPDATE_COLUMN_DATA",
      column: table.options.columns,
      data: table.options.data,
    });
    // }
    console.log("UPDATING");
  }, [table]);

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th style={{ width: "30px" }}></th>
              {headerGroup.headers.map((header) => (
                <DraggableColumnHeader
                  key={header.id}
                  len={table.length}
                  header={header}
                  table={table}
                />
              ))}
            </tr>
          ))}
        </thead>
        <StyledTBody>
          {table.getRowModel().rows.map((row) => (
            <DraggableRow
              key={row.id}
              row={row}
              reorderRow={reorderRow}
            ></DraggableRow>
          ))}
        </StyledTBody>
      </StyledTable>
    </DndProvider>
  );
};

export const defaultProps = {};

export default TableComponent;

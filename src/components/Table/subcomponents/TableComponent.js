import React, { useState } from "react";

// react-table imports
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

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
    column1: "row1col1",
    column2: "row1col2",
    column3: "row1col3",
    column4: "row1col4",
  },
  {
    column1: "row2col1",
    column2: "row2col2",
    column3: "row2col3",
    column4: "row2col4",
  },
  {
    column1: "row3col1",
    column2: "row3col2",
    column3: "row3col3",
    column4: "row3col4",
  },
  {
    column1: "row4col1",
    column2: "row4col2",
    column3: "row4col3",
    column4: "row4col4",
  },
];

// Styled components
const StyledTable = styled("table")({
  border: "0.0625rem solid lightgray",
  tableLayout: "fixed",
  width: "100%",
});

const StyledTh = styled("th")({
  width: "auto",
});

const StyledTBody = styled("tbody")({
  borderBottom: "0.0625rem solid lightgray",
});

const StyledTd = styled("td")({
  borderRight: "1px solid lightgray",
  padding: "0.125rem 0.25rem",
  minHeight: "100px",

  "&:last-child": {
    borderRight: "none",
  },
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
      console.log({ newColumnOrder });
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

const renderComponent = (comp) => {
  const Component = comp.component;
  return <Component />;
};

const DraggableRow = ({ row, reorderRow, len }) => {
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
          {typeof cell.row.original[cell.column.id] !== "string"
            ? renderComponent(cell.row.original[cell.column.id])
            : flexRender(cell.column.columnDef.cell, cell.getContext())}
          {/* <textarea>placeholder</textarea> */}
        </StyledTd>
      ))}
    </tr>
  );
};

const TableComponent = () => {
  const [columns] = useState(() => [...defaultColumns]);
  const [data, setData] = useState(() => [...defaultData]);

  const [columnOrder, setColumnOrder] = useState(
    columns.map((column) => column.id)
  );

  const reorderRow = (draggedRowIndex, targetRowIndex) => {
    data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0]);
    setData([...data]);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.name,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

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

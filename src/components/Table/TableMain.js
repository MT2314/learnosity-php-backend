import React from "react";
import { LayoutProvider } from "./TableContext";

import Table from "./subcomponents/Table";

export const defaultProps = {
  layoutState: {
    headers: [
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
    ],
    data: [
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
    ],
  },
};

const TableMain = ({ layoutState = {}, setProp = () => {} }) => {
  return (
    <LayoutProvider layoutState={layoutState} setProp={setProp}>
      <Table />
    </LayoutProvider>
  );
};

export default TableMain;

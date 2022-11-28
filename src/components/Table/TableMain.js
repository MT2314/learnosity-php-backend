import React from "react";
import { LayoutProvider } from "./TableContext";

import Table from "./subcomponents/Table";

export const defaultProps = {
  layoutState: {
    headers: [],
    data: [],
    headerType: null,
    showTopHeader: false,
    showSideHeader: false,
    showStripes: false,
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

import React, { useMemo } from "react";
import { LayoutProvider } from "./TableContext";
import { v4 as uuidv4 } from "uuid";

import Table from "./subcomponents/Table";

export const defaultProps = {
  layoutState: {
    headers: [],
    data: [],
    headerType: null,
    hideTopHeader: false,
    hideSideHeader: false,
    showStripes: false,
  },
};

const TableMain = ({ layoutState = {}, setProp = () => {} }) => {
  const tableId = useMemo(() => `unique-id-${uuidv4()}`, []);

  return (
    <LayoutProvider layoutState={layoutState} setProp={setProp}>
      <Table tableId={tableId} />
    </LayoutProvider>
  );
};

export default TableMain;

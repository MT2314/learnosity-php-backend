import React from "react";
import PropTypes from "prop-types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { LayoutProvider, ActiveTabProvider } from "./TabContext";
import Tabs from "./subcomponents/Tabs";

import "./styles/Tab.scss";

//tabs default props
export const defaultProps = {
  layoutState: [
    {
      type: "TAB",
      id: uuidv4(),
      title: `Tab 1`,
      components: [],
    },
    {
      type: "TAB",
      id: uuidv4(),
      title: "Tab 2",
      components: [],
    },
  ],
};

const TabsMain = ({ layoutState = [], setProp = () => {} }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <LayoutProvider layoutState={layoutState} setProp={setProp}>
        <ActiveTabProvider>
          <Tabs />
        </ActiveTabProvider>
      </LayoutProvider>
    </DndProvider>
  );
};

TabsMain.propTypes = {
  layoutState: PropTypes.array.isRequired,
  setProp: PropTypes.func.isRequired,
};

export default TabsMain;

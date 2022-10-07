import React from "react";
import PropTypes from "prop-types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { LayoutProvider } from "./TabContext";
import Tabs from "./subcomponents/Tabs";

//tabs default props
export const defaultProps = {
  layoutState: [
    {
      id: uuidv4(),
      title: "",
      placeholder: "Tab 1",
      components: [
        {
          componentName: "Text",
          componentProps: {
            body: {
              ops: [{ insert: "Polkaroo\n" }],
            },
          },
        },
      ],
      activeTab: true,
    },
    {
      id: uuidv4(),
      title: "",
      placeholder: "Tab 2",
      components: [],
      activeTab: false,
    },
  ],
};

const TabsMain = ({ layoutState = [], setProp = () => {} }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <LayoutProvider layoutState={layoutState} setProp={setProp}>
        <Tabs />
      </LayoutProvider>
    </DndProvider>
  );
};

TabsMain.propTypes = {
  layoutState: PropTypes.array.isRequired,
  setProp: PropTypes.func.isRequired,
};

export default TabsMain;

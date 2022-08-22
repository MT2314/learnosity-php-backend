
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LayoutProvider, ActiveTabProvider } from "./TabContext";
import Tabs from "./subcomponents/Tabs";
import ConfigBar from "./subcomponents/ConfigBar";

import "./styles/Tab.scss";

//tabs default props
export const defaultProps = {
  layoutState: [
    {
      type: "TAB",
      id: 0,
      title: "",
      components: [],
    },
    {
      type: "TAB",
      id: 1,
      title: "",
      components: [],
    },
  ],
};

const TabsMain = ({ layoutState = [], setProp = () => {} }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <LayoutProvider layoutState={layoutState} setProp={setProp}>
        <ActiveTabProvider>
          <ConfigBar />
          <Tabs />
        </ActiveTabProvider>
      </LayoutProvider>
    </DndProvider>
  );
};

export default TabsMain;

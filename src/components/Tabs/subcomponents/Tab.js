import React, { useContext } from "react";
import { TabContext, LayoutContext } from "../TabContext";
import { useDrop } from "react-dnd";
import styled from "@emotion/styled";
import Placeholder from "./Placeholder";
import TabComponent from "./TabComponent";

const TabBodyContainer = styled('div')({
  padding: '10px',
  border: '1px solid #bdbdbd',
  borderTop: 'none',
})

const ComponentList = styled('ul')({
  listStyle: 'none',
  paddingLeft: '0px'
})

const Tab = ({ tab, tabIndex }) => {
  const { id, components } = tab;

  const [activeTab] = useContext(TabContext);
  const [dispatch] = useContext(LayoutContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["Text", "Video", "Image", "Table"],
    drop: (item) => {
      dispatch({
        func: "ADD_COMPONENT",
        tabIndex: tabIndex,
        component: {
          componentName: item.componentName,
          componentProps: JSON.parse(item.componentProps),
        },
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <TabBodyContainer
      ref={drop}
      className="tab-body"
      key={id}
      style={{
        backgroundColor: isOver ? "rgba(233, 236, 244, 0.2)" : "inherit",
      }}
    >
      {activeTab === tabIndex && components.length === 0 ? (
        <Placeholder />
      ) : (
        <ComponentList>
          {components.map((component, compIndex) => {
            return (
              <TabComponent
                component={component}
                compIndex={compIndex}
                tabIndex={tabIndex}
              />
            );
          })}
        </ComponentList>
      )}
    </TabBodyContainer>
  );
};
export default Tab;

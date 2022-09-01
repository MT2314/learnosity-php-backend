import React, { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import styled from "@emotion/styled";

import { TabContext, LayoutContext } from "../TabContext";
import ComponentWrapper from "./ComponentWrapper";

//components
import Placeholder from "./Placeholder";

const StyleTabBody = styled("div")(({ theme, isDragging }) => ({
  padding: "10px",
  border: "1px solid #bdbdbd",
  borderTop: "none,",
  backgroundColor: isDragging ? "#E9EDF1" : "white",
}));

const Tab = ({ tab, tabIndex }) => {
  const { id, components } = tab;

  const [activeTab] = useContext(TabContext);
  const [, dispatch] = useContext(LayoutContext);
  const [isDragging, setIsDragging] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["Text", "Image", "Video", "Table"],
    drop: (item) => {
      if (!item?.within) {
        dispatch({
          func: "ADD_COMPONENT",
          tabIndex: tabIndex,
          component: {
            componentName: item.componentName,
            componentProps: JSON.parse(item?.componentProps),
          },
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <StyleTabBody
      ref={drop}
      key={id}
      data-testid="tab-drop-zone"
      isDragging={isDragging}
    >
      {activeTab === tabIndex && components.length === 0 ? (
        <Placeholder isOver={isOver} />
      ) : (
        <ul
          style={{
            padding: 0,
            listStyleType: "none",
          }}
          isOver={isOver}
        >
          {components.map((component, compIndex) => {
            return (
              <ComponentWrapper
                key={`key-component-${compIndex}`}
                component={component}
                compIndex={compIndex}
                tabIndex={tabIndex}
                setIsDragging={setIsDragging}
              />
            );
          })}
        </ul>
      )}
    </StyleTabBody>
  );
};
export default Tab;

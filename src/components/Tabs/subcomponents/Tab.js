import React, { useContext, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import styled from "@emotion/styled";

import { TabContext, LayoutContext } from "../TabContext";
import ComponentWrapper from "./ComponentWrapper";

//error style message
import "../styles/ErrorMsg.scss";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

//components
import Placeholder from "./Placeholder";

//error style message
import "../styles/ErrorMsg.scss";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// NOTE: We can use theme once it is set it up end to end
const StyleTabBody = styled("div")(({ theme, isDragging }) => ({
  padding: "10px 10px 20px 10px",
  border: "1px solid #bdbdbd",
  borderTop: "none,",
  backgroundColor: isDragging ? "#E9EDF1" : "white",
}));

const Tab = ({ tab, tabIndex }) => {
  const { id, components } = tab;

  const [activeTab] = useContext(TabContext);
  const [, dispatch] = useContext(LayoutContext);
  const [isDragging, setIsDragging] = useState(false);

  const [{ isOver, getItem }, drop] = useDrop(() => ({
    accept: ["Text", "Image", "Video", "Table", "Callout", "Tab", "QuoteBox", "IFrame"],
    drop: (item) => {
      if (!item?.within && item.componentName === 'Text' | 'Table' | 'Video' | 'Image') {
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
    canDrop: (item) => {
      if (item.within) return false;
      return true;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      getItem: monitor.getItem(),
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
        <Placeholder isOver={isOver} showError={showError} />
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
                numOfComponent={components.length}
                component={component}
                compIndex={compIndex}
                tabIndex={tabIndex}
                setIsDragging={setIsDragging}
                setShowError={setShowError}
              />
            );
          })}
        </ul>
      )}
    </StyleTabBody>
  );
};
export default Tab;

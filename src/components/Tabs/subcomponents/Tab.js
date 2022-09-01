import React, { useContext, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import styled from "@emotion/styled";

import { TabContext, LayoutContext } from "../TabContext";
import ComponentWrapper from "./ComponentWrapper";

//components
import Placeholder from "./Placeholder";

//error style message
import "../styles/ErrorMsg.scss";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// NOTE: We can use theme once it is set it up end to end
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
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      getItem: monitor.getItem()
    }),
  }));

  // Adding space between Cap except iFrame
  const trimCap = (item) => {
    return item === "IFrame" ? "iFrame" : item.replace(/([A-Z])/g, ' $1').trim();
  }
  
  // Error message stays. This gives the user time to read and learn.
  const [showError, setShowError] = useState()
  useEffect(() => {
    if (isOver && (getItem.componentName != 'Text' | 'Table' | 'Video' | 'Image')) {
      setShowError(trimCap(getItem.componentName));
    } else if (isOver) {
      setShowError();
    }
  }, [isOver])

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
              />
            );
          })}
          {showError && <p className="tabErrorBg"><ErrorOutlineIcon/> &nbsp; Error: component is not compatible. Only text, image, chart, table, video, and audio.</p>}
        </ul>
      )}
    </StyleTabBody>
  );
};
export default Tab;

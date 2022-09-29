import React, { useContext, useState, useEffect, useRef } from "react";
import PlaceHolder from "../subComponent/PlaceHolder";
import { useDrop } from "react-dnd";
import {
  TabContext,
  LayoutContext,
} from "../../../Context/InteractivesContext";
import NestedComponentWrapper from '../../../Utility/NestedComponentWrapper'

const AccordionItem = ({ accordion, accordionIndex }) => {
  const { id, components } = accordion;
  const [activeTab] = useContext(TabContext);
  const [, dispatch] = useContext(LayoutContext);

  //List of accepted into tab componenets
  const acceptListComp = (item) => {
    return ["Text", "Table", "Video", "Image"].indexOf(item.componentName) >= 0;
  };

  const [showDropError, setShowDropError] = useState();
  const [{ isOver, getItem }, drop] = useDrop(() => ({
    accept: [
      "Text",
      "Image",
      "Video",
      "Table",
      "InfoBox",
      "QuoteBox",
      "IFrame",
    ],
    drop: async (item, monitor) => {
      if (!acceptListComp(item)) setShowDropError(true);
      if (item.within && components.length !== 0) return;
      if (monitor.didDrop()) return;
      if (acceptListComp(item)) {
        console.log("DROPPED ITEM:", item);

        dispatch({
          func: "ADD_COMPONENT",
          tabIndex: activeTab,
          component: {
            componentName: item.componentName,
            componentProps: JSON.parse(item?.componentProps),
          },
        });
        item?.delete && item?.delete(item.tabIndex, item.compIndex);
      }
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      getItem: monitor.getItem(),
    }),
  }));

  return (
    <div
      data-testid="accordion-dropzone"
      ref={drop}
      style={{ background: isOver && "green" }}
    >
      {components.length !== 0 ? (
        components.map((component, compIndex) => {
          return (
            // <AccordionComponent
            //   key={`key-component-${compIndex}`}
            //   component={component}
            //   compIndex={compIndex}
            //   tabIndex={activeTab}
            // />
            <NestedComponentWrapper
              component={component}
              compIndex={compIndex}/>
          );
        })
      ) : (
        <PlaceHolder />
      )}
    </div>
  );
};

export default AccordionItem;

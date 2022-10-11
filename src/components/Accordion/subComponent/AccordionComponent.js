import React, { useContext } from "react";
import componentIndex from "../../componentIndex";
import {
  LayoutContext,
  TabContext,
} from "../../../Context/InteractivesContext";

const AccordionComponent = ({ component, compIndex }) => {
  const [, dispatch] = useContext(LayoutContext);
  const [activeTab] = useContext(TabContext);

  const { componentName, componentProps } = component;

  //get the matching component from the componentIndex
  const componentDetails = componentIndex[componentName];

  const { Component } = componentDetails;

  return (
    <Component
      key={`comp-${compIndex}`}
      role="listitem"
      setProp={(stateUpdate) => {
        dispatch({
          func: "UPDATE_COMPONENT",
          compIndex: compIndex,
          tabIndex: activeTab,
          stateUpdate: stateUpdate,
        });
      }}
      {...componentProps}
    />
  );
};
export default AccordionComponent;

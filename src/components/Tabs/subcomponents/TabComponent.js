import React, { useContext, useState} from "react";
import componentIndex from "../../../components/componentIndex";
import { LayoutContext, TabContext } from "../TabContext";

const TabComponent = ({ component, compIndex, setTabActive }) => {


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
        setTabActive={setTabActive} 
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
export default TabComponent;

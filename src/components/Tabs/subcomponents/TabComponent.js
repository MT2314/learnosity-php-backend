import React, { useContext } from "react";
import componentIndex from "../../../components/componentIndex";
import { LayoutContext, TabContext } from "../TabContext";

const TabComponent = ({ component, compIndex }) => {

  const [state, dispatch] = useContext(LayoutContext);
  const [activeTab, setActiveTab] = useContext(TabContext);

  const {componentName, componentProps} = component

  //get the matching component from the componentIndex
  const componentDetails = componentIndex[componentName]

  const { Component } = componentDetails;


  return (
    <li key={`comp-${compIndex}`}>
      <Component setProp={(stateUpdate) => {
        dispatch({
          func: "UPDATE_COMPONENT",
          compIndex: compIndex,
          tabIndex: activeTab,
          stateUpdate: stateUpdate
        });

      }} {...componentProps} />
    </li>
  );
};
export default TabComponent;

import React from "react";
import componentIndex from "../../componentIndex";

const TabComponent = ({ component, compIndex }) => {

  const {componentName, componentProps} = component

  //get the matching component from the componentIndex
  const componentDetails = componentIndex[componentName]

  const { Component } = componentDetails;

  return (
    <li key={`comp-${compIndex}`}>
      <Component {...componentProps}/>
    </li>
  );
};
export default TabComponent;

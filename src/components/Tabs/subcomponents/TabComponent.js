import React from "react";

const TabComponent = ({ component, compIndex }) => {
  console.log(component.componentName);
  const componentName = component.componentName;

  return (
    <li key={`comp-${compIndex}`}>
      <p>{componentName}</p>
    </li>
  );
};
export default TabComponent;

import React from "react";
import componentIndex from "../../../components/componentIndex";

const TabComponent = ({ component, compIndex }) => {
  const { componentName } = component;

  const Component = componentIndex[componentName]?.Component;

  return (
    <li key={`comp-${compIndex}`}>
      <p>{componentName}</p>
      <Component />
    </li>
  );
};
export default TabComponent;

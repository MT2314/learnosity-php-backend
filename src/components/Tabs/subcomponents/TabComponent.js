import React, { useContext } from "react";
import componentIndex from "../../../components/componentIndex";
import styled from "@emotion/styled";
import { LayoutContext, TabContext } from "../TabContext";

const StyledListItem = styled("li")({
  listStyle: "none",
  padding: "0px",
});

const TabComponent = ({ component, compIndex }) => {
  const [, dispatch] = useContext(LayoutContext);
  const [activeTab] = useContext(TabContext);

  const { componentName, componentProps } = component;

  //get the matching component from the componentIndex
  const componentDetails = componentIndex[componentName];

  const { Component } = componentDetails;

  return (
    <StyledListItem key={`comp-${compIndex}`}>
      <Component
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
    </StyledListItem>
  );
};
export default TabComponent;

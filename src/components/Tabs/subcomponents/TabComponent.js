import React, { useState, useContext } from "react";
import componentIndex from "../../../components/componentIndex";
import styled from "@emotion/styled";
import { LayoutContext } from "../TabsMain";

const InnerBox = styled("div")({
  boxShadow: "0px 0px 0px 1px #E0E0E0",
  borderRadius: 4,
  padding: "8px 10px",
  marginBottom: 18,
});

const ListItem = styled("li")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: theme.typography.fontFamily,
  listStyle: "none",
}));

const MockStateWrapper = ({ Component, data }) => {
  const [state, dispatch] = useContext(LayoutContext);

  console.log(state);
  return (
    <Component
      setProp={() => {
        dispatch({ func: "UPDATE_COMPONENT" });
      }}
    />
  );
};

const TabComponent = ({ component, compIndex }) => {
  const { componentName, componentProps } = component;

  const Component = componentIndex[componentName]?.Component;
  console.log(component);
  return (
    <InnerBox>
      <ListItem key={`comp-${compIndex}`}>
        <MockStateWrapper Component={Component} data={componentProps} />
      </ListItem>
    </InnerBox>
  );
};
export default TabComponent;

import React, { useContext } from "react";
import componentIndex from "../../../components/componentIndex";
import styled from "@emotion/styled";
import { LayoutContext, TabContext } from "../TabContext";

// const InnerBox = styled("div")({
//   boxShadow: "0px 0px 0px 1px #E0E0E0",
//   borderRadius: 4,
//   padding: "8px 10px",
//   marginBottom: 18,
// });

// const ListItem = styled("li")(({ theme }) => ({
//   color: theme.palette.primary.main,
//   fontFamily: theme.typography.fontFamily,
//   listStyle: "none",
// }));

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

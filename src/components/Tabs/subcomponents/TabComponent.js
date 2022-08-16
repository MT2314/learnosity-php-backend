import React, {useContext} from "react";
import { LayoutContext } from "../TabsMain";
import componentIndex from "../../componentIndex";

const TabComponent = ({ component, compIndex }) => {

  const [state, dispatch] = useContext(LayoutContext);

  const {componentName, componentProps} = component

  //get the matching component from the componentIndex
  const componentDetails = componentIndex[componentName]

  const { Component } = componentDetails;

  // const handleChange = (newState) => {
  //   console.log(`Updating state for ${id} ->`, state, newState);
  //   setState((prevState) => ({
  //     ...prevState,
  //     [id]: { ...prevState[id], ...newState },
  //   }));
  // };


  return (
    <li key={`comp-${compIndex}`}>
      <Component setProp={dispatch({func:"UPDATE_COMPONENT"})} {...componentProps} />
    </li>
  );
};
export default TabComponent;

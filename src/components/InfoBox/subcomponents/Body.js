import React, { useContext, useEffect } from "react";
import { InfoBoxContext } from "../InfoBoxContext";
import Text from "../../Text/Text";

const Body = (props) => {
  const [state, dispatch] = useContext(InfoBoxContext);

  //Check and update if Icon was selected or changed
  useEffect(() => {
    dispatch({ func: "CHANGE_ICON", icon: props.selectedIcon });
  }, [props.selectedIcon]);

  //Updates body when user types in Text component
  const updateBody = (body) => {
    dispatch({ func: "CHANGE_BODY", body: body.body });
  };

  return (
    <Text body={state?.body} setProp={updateBody} isInfoBox={true} {...props} />
  );
};

export default Body;

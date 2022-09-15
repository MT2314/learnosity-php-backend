import React, { useContext, useEffect } from "react";

import Text from "../../Text/Text";

import { InfoBoxContext } from "../InfoBoxContext";

const Body = (props) => {
  const [state, dispatch] = useContext(InfoBoxContext);

  useEffect(() => {
    dispatch({ func: "CHANGE_ICON", icon: props.selectedIcon });
  }, [props.selectedIcon]);

  const updateBody = (body) => {
    dispatch({ func: "CHANGE_BODY", body: body.body });
  };

  return (
    <Text body={state?.body} setProp={updateBody} isInfoBox={true} {...props} />
  );
};

export default Body;

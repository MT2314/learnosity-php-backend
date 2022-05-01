import React, { useState, createContext } from "react";

export const CalloutWidgetContext = createContext();

function CalloutProvider({ children }) {
  const inputs = {
    calloutTitle: "",
    calloutTypeSvg: "",
    calloutBody: "",
    updateContext: (contextUpdates) => {
      setUserInfo((currentContextInfo) => ({
        ...currentContextInfo,
        ...contextUpdates,
      }));
    },
  };

  const [userInfo, setUserInfo] = useState(inputs);

  return (
    <CalloutWidgetContext.Provider value={userInfo}>
      {children}
    </CalloutWidgetContext.Provider>
  );
}

export default CalloutProvider;

import React, { useState, createContext } from "react";

export const ImageWidgetContext = createContext();

export function ImageProvider({ children, testing = false }) {
  const inputs = {
    imageDefault: {
      alt: "",
      longDesc: "",
      imgLink: "",
      creditLink: "",
      uploadedImg: "",
      imgSize: "default",
    },
    alt: "",
    longDesc: "",
    imgLink: "",
    creditLink: "",
    uploadedImg: "",
    imgSize: "default",
    updateContext: (contextUpdates) => {
      setUserInfo((currentContextInfo) => ({ ...currentContextInfo, ...contextUpdates }));
    },
    updateReferencedContext: (uuid, contextUpdates) => {
      setUserInfo((currentContextInfo) => ({
        ...currentContextInfo,
        [uuid]: { ...(currentContextInfo[uuid] || {}), ...contextUpdates },
      }));
    },
  };

  if (testing) {
    inputs.selectedUUID = "1";
    inputs["1"] = {
      alt: "",
      longDesc: "",
      imgLink: "",
      creditLink: "",
      uploadedImg: "",
      imgSize: "default",
    };
  }

  const [userInfo, setUserInfo] = useState(inputs);

  return <ImageWidgetContext.Provider value={userInfo}>{children}</ImageWidgetContext.Provider>;
}

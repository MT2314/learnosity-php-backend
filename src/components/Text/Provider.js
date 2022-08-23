import React from "react";
import { useState, createContext, useRef } from "react";

export const TextContext = createContext();

export default function ProviderComponent(props) {
  const contextInformation = {
    quill: useRef(null),

    updateContext: (contextUpdates) => {
      setContextInfo((currentContextInfo) => ({
        ...currentContextInfo,
        ...contextUpdates,
      }));
    },
  };

  const [contextInfo, setContextInfo] = useState(contextInformation);

  return (
    <TextContext.Provider value={contextInfo}>
      {props.children}
    </TextContext.Provider>
  );
}

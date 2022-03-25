import React, { createContext, useState } from 'react';

export const WidgetContext = createContext();

export const WidgetContextProvider = ({ children }) => {
  const inputs = {
    userName: "",
    userAge: "",
    userFavFood: "",
    updateContext: (contextUpdates) => {
      setUserInfo((currentContextInfo) => ({...currentContextInfo, ...contextUpdates}))
    }
  }
  const [ userInfo, setUserInfo ] = useState(inputs)

  return (
        <WidgetContext.Provider value={userInfo}>
          {children}
        </WidgetContext.Provider>
      )
}
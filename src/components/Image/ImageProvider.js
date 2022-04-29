import React, { useState, createContext } from 'react';

export const ImageWidgetContext = createContext();

function ImageProvider({ children }){
   
   const inputs = {
      alt: "",
      longDesc: "",
      imgLink: "",
      creditLink: "",
      uploadedImg: "",
      imgSize: "default",
      updateContext: (contextUpdates) => {
         setUserInfo((currentContextInfo) => ({...currentContextInfo, ...contextUpdates}))
      }
   };

   const [ userInfo, setUserInfo ] = useState(inputs);

   return (
      <ImageWidgetContext.Provider value={userInfo}>
         {children}
      </ImageWidgetContext.Provider>
   );
};

export default ImageProvider
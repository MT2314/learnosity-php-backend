import React, { useState } from "react";
import DefaultText from "./subcomponent/DefaultText";
import EditorComponent from "./subcomponent/EditorComponent";
import "./styles/Text.scss";

export const defaultProps = { body: null };

const Text = () => {
  const [showEditor, setShowEditor] = useState(false);

  const handleOnClick = () => {
    setShowEditor(true);
  };


  return(
    <>
    {!showEditor ?
      <div onClick={() => {handleOnClick()}} className='mainContainer' data-testid="text-component"><DefaultText /></div>  
    : 
      <EditorComponent/>
      }
    </>
  )

};

export default Text;

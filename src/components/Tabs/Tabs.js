import React, { useState } from "react";

import inlineConfig from "./utility/inlineConfig";
import FormattedText from "../FormattedText";

export const defaultProps = {
  tabsIntroduction: null,
  tabs: [
    {
      tabLabel: "Geography",
      components: [<FormattedText toolbar={inlineConfig} placeholderText="Type stuff here..."/>],
    },
    {
      tabLabel: "Science",
      components: [<FormattedText toolbar={inlineConfig}/>, <FormattedText toolbar={inlineConfig}/>],
    },
    {
      tabLabel: "Math",
      components: [<FormattedText toolbar={inlineConfig}/>, <FormattedText toolbar={inlineConfig}/>],
    },
  ],
};


const Section = ({ tab, id }) => {
   
   const [ activeIndex, setActiveIndex ]= useState(0)
   
   console.log(activeIndex)

   const handleOnClick = () => {
      setActiveIndex(id)
   }
  return (
    <>
      <p id={id} onClick={() => handleOnClick()}>{tab.tabLabel}</p>
      {tab.components.map((component) => {
         if(id === activeIndex){
            return <Content component={component} section={id} activeIndex={activeIndex}/>;
         }else{
            return null
         }
      })}
    </>
  );
};

const Content = ({component, section, activeIndex }) => {
   return(<div id={section} style={!activeIndex ? { display: "none" } : { display:"block" }}>{component}</div>)
}

const Tabs = ({
  type = "tabs",
  tabsIntroduction = null,
  tabs,
  setProp = () => {},
}) => {
  
  return (
     <div>
        {/* <button onClick={handleAddTab}>Add a Tab</button> */}
        {tabs.map((tab, index) => {
          return (
            <Section tab={tab} id={index}/>
          );
        })}
     </div>

  );
};

export default Tabs;

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


const Section = ({ tab, id, handleOnClick, children }) => {
   console.log("====>", id)
  return (
   <>
     <p key={id} onClick={() => handleOnClick(id)}>{tab.tabLabel}</p>
     {children}
   </>
  );
};


const Tabs = ({
  type = "tabs",
  tabsIntroduction = null,
  tabs,
  setProp = () => {},
}) => {

   const [ activeIndex, setActiveIndex ]= useState(0)


   const handleOnClick = (id) => {
      setActiveIndex(id)
   }

   const _tabContent = tabs[activeIndex].components.map((component) => {
      return <p>dog</p>
   })
  
  return (
     <div>
        {/* <button onClick={handleAddTab}>Add a Tab</button> */}
        {tabs.map((tab, index) => {
          return (
            <Section tab={tab} id={index} handleOnClick={handleOnClick}>
               {
                  index === activeIndex ?
                  _tabContent : null
               }       
            </Section>
          );
        })} 
     </div>

  );
};

export default Tabs;

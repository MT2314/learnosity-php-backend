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
  ],
};


const Section = ({ tab, id, handleOnClick, children }) => {
  return (
   <div data-tab-section>
     <p key={id} onClick={() => handleOnClick(id)}>{tab.tabLabel}</p>
     {children}
   </div>
  );
};

const AddTab = ({data}) => {
   //create form 
   //1. input to add title
   //2. select to add component
   const handleAddTab = () => {
      data.push({tabLabel: "Banana"})
      console.log(data)
   }
   return(
      <button onClick={() => handleAddTab()}>Add a Tab</button>

   )
}


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



   const _tabContent = tabs[activeIndex].components.map(( component ) => {
      return component
   })
  
  return (
     <div data-tab-container>
        <AddTab data={tabs}/>
        {/* <button onClick={handleAddTab}>Add a Tab</button> */}
        {tabs.map((tab, index) => {
          return (
            <Section tab={tab} id={index} handleOnClick={handleOnClick}>
               { index === activeIndex && _tabContent }       
            </Section>
          );
        })}       
     </div>

  );
};

export default Tabs;

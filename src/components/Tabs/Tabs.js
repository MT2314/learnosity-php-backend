import React from 'react';

import FormattedText from '../FormattedText';


export const defaultProps = {
   tabsIntroduction: null,
   tabs: null,

 };


 const Tabs = (
    { 
      type, 
      tabsIntroduction, 
      tabs, 
      setProp = () => {}}) => {
         
         const mockData = {
            type: "tabs",
            tabs: [
               {
                  tabLabel: "",
                  components: [
                  ]
               },
               {}
            ]
         }
       
         return (<div>hello world!</div>);
}


export default Tabs;
import React from 'react';

import FormattedText from '../FormattedText';


export const defaultProps = {
   tabsIntroduction: null,
   tabs: null,
 };


const Tabs = (
   { uuid, 
      uuidClean, 
      type, 
      introduction, 
      tabs, 
      setProp = () => {}}) => {

   const mockData = {
      uuid: "",
      uuidClean: "",
      type: "tabs",
      tabs: [
         {
            uuid: "",
            type: "formattedText",
            tabLabel: "",
            components: [
               
            ]
         },
         {}
      ]
   }

   return (
      <h1>Hello, World I am a Tabs!</h1>
   )
}

export default Tabs;
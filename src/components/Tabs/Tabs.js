import React, { useState } from 'react';

import FormattedText from '../FormattedText';
import { Tab, Box } from '@mui/material';
import { TabPanel, TabContext, TabList } from "@mui/lab";


export const defaultProps = {
   tabsIntroduction: null,
   tabs: null,
 };


 const TabWidget = (
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
         const [value, setValue] = useState('1');

         const handleChange = (event, newValue) => {
           setValue(newValue);
         };
       
         return (
           <Box sx={{ width: '100%', typography: 'body1' }}>
             <TabContext value={value}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                 <TabList onChange={handleChange} aria-label="lab API tabs example">
                   <Tab label="Item One" value="1" />
                   <Tab label="Item Two" value="2" />
                   <Tab label="Item Three" value="3" />
                 </TabList>
               </Box>
               <TabPanel value="1">Item One</TabPanel>
               <TabPanel value="2">Item Two</TabPanel>
               <TabPanel value="3">Item Three</TabPanel>
             </TabContext>
           </Box>
         );
}


export default TabWidget;
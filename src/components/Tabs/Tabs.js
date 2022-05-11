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
                   <Tab label="Kangaroos" value="1" />
                   <Tab label="Cats" value="2" />
                   <Tab label="Dogs" value="3" />
                 </TabList>
               </Box>
               <TabPanel value="1">The kangaroo is a marsupial from the family Macropodidae. In common use the term is used to describe the largest species from this family, the red kangaroo, as well as the antilopine kangaroo, eastern grey kangaroo, and western grey kangaroo. </TabPanel>
               <TabPanel value="2">The cat is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family.</TabPanel>
               <TabPanel value="3">The dog or domestic dog is a domesticated descendant of the wolf, and is characterized by an upturning tail. The dog is derived from an ancient, extinct wolf, and the modern wolf is the dog's nearest living relative.</TabPanel>
             </TabContext>
           </Box>
         );
}


export default TabWidget;
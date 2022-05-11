import React from "react";

import FormattedText from "../FormattedText";

export const defaultProps = {
  tabsIntroduction: null,
  tabs: [],
};

const TabContainer = ({ children }) => {
  return <div>{children}</div>;
};

const TabTitle = ({ children, title }) => {
   return <h3>{title}</h3>
}

const Tabs = ({
  type = "tabs",
  tabsIntroduction = null,
  tabs,
  setProp = () => {},
}) => {

   tabs = [
   {
      tabLabel: "Geography",
      components: [<FormattedText/>]
   },
   {
      tabLabel: "Science",
      components: [<FormattedText/>,<FormattedText/>]
   },
   {
      tabLabel: "Math",
      components: [<FormattedText/>,<FormattedText/>]
   }]
   console.log(tabs, type)
  return (
    <TabContainer>
      <p> I am the tab container</p>
      {
         tabs.map((tab) => {
            return (
              <TabTitle title={tab.tabLabel}>
               <div>
                  {
                     tab.components.map((component) => {
                        return(
                           <div>{component}</div>
                        )
                     })
                  }
               </div>

              </TabTitle>
            )
         })
      }
    </TabContainer>
  );
};

export default Tabs;

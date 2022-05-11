import React from "react";

import FormattedText from "../FormattedText";

export const defaultProps = {
  tabsIntroduction: null,
  tabs: [],
};

const TabContainer = ({ children, tabsIntroduction }) => {
  return <div>{children}</div>;
};

const TabTitle = ({ children, title }) => {
  return <h3> TAB TabTitle </h3>;
};

const Tabs = ({
  type = "tabs",
  tabsIntroduction = null,
  tabs,
  setProp = () => {},
}) => {
  tabs = [
    {
      tabLabel: "Geography",
      components: [<FormattedText />],
    },
    {
      tabLabel: "Science",
      components: [<FormattedText />, <FormattedText />],
    },
    {
      tabLabel: "Math",
      components: [<FormattedText />, <FormattedText />],
    },
  ];
  console.log(tabs, type);
  return (
    <TabContainer tabsIntroduction={tabsIntroduction}>
      {tabs.map((tab) => {
        return (
          <>
            <p>{tab.tabLabel}</p>
            {tab.components.map((component) => {
              return <div>{component}</div>;
            })}
          </>
        );
      })}
    </TabContainer>
  );
};

export default Tabs;

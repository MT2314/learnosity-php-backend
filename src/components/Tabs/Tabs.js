import React from "react";

import FormattedText from "../FormattedText";

export const defaultProps = {
  tabsIntroduction: null,
  tabs: [
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
  ],
};

const TabContainer = ({ children }) => {
  return <div>{children}</div>;
};

const TabSection = ({ tab }) => {
  return (
    <>
      <p>{tab.tabLabel}</p>
      {tab.components.map((component) => {
        return <div>{component}</div>;
      })}
    </>
  );
};

const Tabs = ({
  type = "tabs",
  tabsIntroduction = null,
  tabs,
  setProp = () => {},
}) => {

  console.log(tabs, type);
  return (
    <TabContainer tabsIntroduction={tabsIntroduction}>
      {/* Tab Introduction */}
      <FormattedText
        placeHolderText="Type introduction here..."
        body={tabsIntroduction}
        setProp={(stateUpdate) =>
          setProp({ tabIntroduction: stateUpdate.body })
        }
      />

      {tabs.map((tab) => {
        return (
          <TabSection tab={tab} />
        );
      })}
    </TabContainer>
  );
};

export default Tabs;

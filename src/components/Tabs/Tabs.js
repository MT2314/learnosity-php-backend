import React from "react";

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
    <TabContainer>
      {/* Tab Introduction */}
      <FormattedText
        placeHolderText="Type introduction here..."
        body={tabsIntroduction}
        toolbar={inlineConfig}
        setProp={(stateUpdate) =>
          setProp({ tabIntroduction: stateUpdate.body })
        }
      />
      {/* <button onClick={handleAddTab}>Add a Tab</button> */}
      {tabs.map((tab) => {
        return (
          <TabSection tab={tab} />
        );
      })}
    </TabContainer>
  );
};

export default Tabs;

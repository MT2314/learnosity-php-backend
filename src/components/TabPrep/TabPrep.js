import React, { createContext, useState, useReducer } from "react";
import TabEl from "./subcomponents/TabEl";

//import immer
import produce from 'immer';

export const defaultProps = {
  layout: [
    {
      type: "TAB",
      id: 0,
      title: "Tab 1",
      components: [
        {
          componentType: "image",
          id: "0-0",
          type: "component",
        },
      ],
    },
    {
      type: "TAB",
      id: 1,
      title: "Tab 2",
      components: [
        {
          componentType: "image",
          id: "1-0",
          type: "component",
        },
        {
          componentType: "image",
          id: "1-1",
          type: "component",
        },
        {
          componentType: "image",
          id: "1-2",
          type: "component",
        },
      ],
    },
  ],
};
//state of Layout
export const LayoutContext = createContext();

export const LayoutProvider = ({children}) => {
  const { layout } = defaultProps
  
  const [ state, dispatch ] = useReducer( 
    produce(
        (draft, action) => {
         switch(action.func){
           case 'ADD_TAB': 
            draft.push({
              id: action.id, 
              title: action.title,
              components: []
            })
               break
            case 'REMOVE_TAB':
              draft.splice( action.tabIndex, 1)
            break
            case 'ADD_COMPONENT':
              console.log("action", action)
              //console.log("here is the dropped item:", action.component)
              draft[action.tabIndex].components.push({
                ...action.component
                })
              break
            case 'DELETE_COMPONENT':
              draft[action.tabIndex].components.splice(action.componentIndex, 1)
              break
             default: 
             break
         }
       }
      
      )
    , layout)

    return (
      <LayoutContext.Provider value={[state, dispatch]}>
        {children}
      </LayoutContext.Provider>
    );
} 
//state for the active tab index
export const TabContext = createContext();

const TabPrep = ({ layout, setProp = () => {} }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <LayoutProvider>
      <TabContext.Provider value={[activeTab, setActiveTab]}>
        <div className="tab-container">
          {layout.map((tab, tabIndex) => {
            return <TabEl tabIndex={tabIndex} tab={tab} />;
          })}
        </div>
      </TabContext.Provider>
    </LayoutProvider>
  );
};

export default TabPrep;

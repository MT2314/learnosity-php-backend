import React, { useContext } from 'react'
import { TabContext } from '../TabPrep';
import TabComponents from './TabComponents';

const TabEl = ({ tab, tabIndex }) => { 

  const { id, title, components } = tab;
  
  const [ activeTab, setActiveTab ] = useContext(TabContext)

  return (
    <li key={id}>
      <h3 onClick={() => setActiveTab(tabIndex)}>{title}</h3>
      <ul>
        {components.map((component, compIndex) => {
          if(activeTab === tabIndex){
            return(
                  <TabComponents
                    component={component}
                    compIndex={compIndex}
                    tabIndex={tabIndex}
                    />
              )
          }else{ return null }
        } 
        )}
      </ul>
    </li>
  )

}  
  export default TabEl;
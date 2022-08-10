import React from 'react'

const TabComponent = ({ component, compIndex }) => { 

  const { componentProps } = component

  return (
       <li
        key={`comp-${compIndex}`}
      >
        <p>{componentProps.componentName}</p>
      </li>
  )
}  
export default TabComponent;
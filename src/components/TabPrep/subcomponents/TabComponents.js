import React from 'react'

const TabComponents = ({ component, compIndex, tabIndex}) => { 

  const { componentType, type } = component

  return (
       <li
        key={`comp-${compIndex}`}
      >
        <p>{componentType}</p>
      </li>
  )
}  
export default TabComponents;
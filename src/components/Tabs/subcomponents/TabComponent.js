import React from 'react'

const TabComponent = ({ component, compIndex }) => { 

  const { componentType } = component

  return (
       <li
        key={`comp-${compIndex}`}
      >
        <p>{componentType}</p>
      </li>
  )
}  
export default TabComponent;
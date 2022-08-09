import React from 'react'

const TabComponent = ({ component, compIndex }) => { 

  const { componentType } = component

  return (
       <li
        key={`comp-${compIndex}`}
      >
        <p>I am a component</p>
      </li>
  )
}  
export default TabComponent;
import React from 'react';

const Header = ({title, backgroundColor = "darkslategray"}) => {
   const styles = {
      backgroundColor: `${backgroundColor}`,
      color:"white",
      width: "auto",
      padding: "3rem",
      marginTop: 0,
   }
   return(
      <h1 style={styles}>Platypus || {title} </h1>
)};
export default Header
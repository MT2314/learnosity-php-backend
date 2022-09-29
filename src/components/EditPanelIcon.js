import React from "react";
//TODO this component is not longer needed. Please delete asap. It still has conflicts with Image and Video
const EditPanelIcon = ({ title, icon }) => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontWeight: "400",
      fontSize: "1rem",
      letterSpacing: "0.00938em",
      width: "90%",
      borderBottom: "1px solid #e0e0e0",
    },
    icon: {
      marginRight: "0.5em",
      userSelect: "none",
      width: "1em",
      height: "1em",
      display: "inline-block",
      fill: "currentcolor",
      flexShrink: "0",
      transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      fontSize: "1.5rem",
    },
  };
  return (
    <div style={styles.container}>
      <p style={styles.icon}>{icon}</p>
      <p>{title}</p>
    </div>
  );
};

export default EditPanelIcon;

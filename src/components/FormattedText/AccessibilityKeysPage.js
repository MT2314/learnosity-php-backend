import React from "react";
// import { Link } from "react-router-dom";

const AccessibilityKeyPage = () => {
  return (
    <>
      <p style={{ color: "black", fontSize: "22pt" }}>
        Text Formatting Keyboard Shortcuts
      </p>
      <table>
        <thead></thead>
        <tr>
          <td>Style</td>
          <td>Shortcut</td>
        </tr>
        <tr>
          <td>To make text bold</td>
          <td>cmd + b</td>
        </tr>
        <tr>
          <td>To make text italic</td>
          <td>cmd + i</td>
        </tr>
        <tr>
          <td>To underline text</td>
          <td>cmd + u</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </table>
    </>
  );
};

export default AccessibilityKeyPage;

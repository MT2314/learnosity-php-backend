import React from "react";

const AccessibilityKeyPage = () => {
  return (
    <>
      <p style={{ color: "black", fontSize: "22pt" }}>
        Text Formatting Keyboard Shortcuts
      </p>
      <table style={{ width: "35%" }}>
        <thead style={{ fontWeight: "bold" }}>
          <td>Style</td>
          <td>Windows Shortcut</td>
          <td>Mac Shortcut</td>
        </thead>
        <tr>
          <td>Make selected text bold</td>
          <td>Ctrl + B</td>
          <td>Cmd + B</td>
        </tr>
        <tr>
          <td>Make selected text italic</td>
          <td>Ctrl + I</td>
          <td>Cmd + I</td>
        </tr>
        <tr>
          <td>Make selected text underlined</td>
          <td>Ctrl + U</td>
          <td>Cmd + U</td>
        </tr>
        <tr>
          <td>Strikethrough</td>
          <td>Alt + H + 4</td>
          <td>Cmd + Shift + X</td>
        </tr>
        <tr>
          <td>Make selected text superscript</td>
          <td>Ctrl + Shift + =</td>
          <td>Cmd + Shift + =</td>
        </tr>
        <tr>
          <td>Make selected text subscript</td>
          <td>Ctrl + =</td>
          <td>Cmd + =</td>
        </tr>
        <tr>
          <td>Indent</td>
          <td>Tab</td>
          <td>Tab</td>
        </tr>
        <tr>
          <td>Outdent</td>
          <td>Shift + Tab</td>
          <td>Shift + Tab</td>
        </tr>
        <tr>
          <td>Bulleted List</td>
          <td>Shift + H</td>
          <td>Cmd + H</td>
        </tr>
        <tr>
          <td>Numbered List</td>
          <td>Shift + O</td>
          <td>Cmd + O</td>
        </tr>
        <tr>
          <td>Insert Link</td>
          <td>Shift + K</td>
          <td>Cmd + K</td>
        </tr>
        <tr>
          <td>Right Align</td>
          <td>Ctrl + R</td>
          <td>Cmd + R</td>
        </tr>
        <tr>
          <td>Left Align</td>
          <td>Ctrl + J</td>
          <td>Cmd + J</td>
        </tr>
        <tr>
          <td>Center Align</td>
          <td>Ctrl + E</td>
          <td>Cmd + E</td>
        </tr>
      </table>
    </>
  );
};

export default AccessibilityKeyPage;

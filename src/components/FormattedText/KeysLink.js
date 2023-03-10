import React from "react";
import "./FormattedText.style.css";

import { Link } from "react-router-dom";

export const KeysLink = () => {
  return (
    <>
      <div className="keys-link-container">
        <Link
          to="/AccessibilityKeysPage"
          target="_blank"
          className="shortcuts-link"
        >
          keyboard shortcuts
        </Link>
      </div>
    </>
  );
};

export default KeysLink;

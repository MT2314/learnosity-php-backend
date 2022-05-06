import React from "react";
import "./FormattedText.style.css";

import { Link } from "react-router-dom";

export const KeysLink = () => {
  return (
    <>
      <div>
        <Link to="/AccessibilityKeysPage" className="shortcuts-link">
          keyboard shortcuts
        </Link>
      </div>
    </>
  );
};

export default KeysLink;

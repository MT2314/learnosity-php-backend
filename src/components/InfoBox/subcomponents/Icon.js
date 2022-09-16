import React, { useEffect, useContext, useMemo } from "react";

import { InfoBoxContext } from "../InfoBoxContext";
import { iconDropdownOptions, defaultIcon } from "../icons/infoBoxIcons";

const Icon = ({ setSelectedIcon, selectedIcon }) => {
  const [state] = useContext(InfoBoxContext);

  const stateIcon = useMemo(() => state?.infoBoxIcon, [state?.infoBoxIcon]);

  useEffect(() => {
    !selectedIcon && setSelectedIcon(stateIcon);
  }, []);

  return (
    <div data-icon={stateIcon ? stateIcon?.type : ""}>
      {stateIcon !== null
        ? iconDropdownOptions.find((icon) => icon.type === stateIcon.type)?.icon
        : defaultIcon}
    </div>
  );
};

export default Icon;

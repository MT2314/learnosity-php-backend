import React, { useEffect, useContext, useMemo } from "react";

import { InfoBoxContext } from "../InfoBoxContext";
import { iconDropdownOptions, defaultIcon } from "../icons/infoBoxIcons";
import { useTranslation } from "react-i18next";

const Icon = ({ setSelectedIcon, selectedIcon }) => {
  const [state] = useContext(InfoBoxContext);
  const { t } = useTranslation();

  const stateIcon = useMemo(() => state?.infoBoxIcon, [state?.infoBoxIcon]);

  useEffect(() => {
    !selectedIcon && setSelectedIcon(stateIcon);
  }, []);

  return (
    <div
      data-icon={stateIcon ? stateIcon : ""}
      data-testid="icon"
      aria-label={t(`${selectedIcon}`)}
    >
      {stateIcon !== null
        ? iconDropdownOptions.find((icon) => icon.type === stateIcon)?.icon
        : defaultIcon}
    </div>
  );
};

export default Icon;

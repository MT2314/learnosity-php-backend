import React, { useState } from "react";

import EditPanelIcon from "../EditPanelIcon";

import { CropDin } from "@mui/icons-material/";

import styles from "./styles/IFrameConfig.module.scss";

const IFrameConfig = ({ componentState = {}, setState = () => {} }) => {
  const {
    title = "Weighted Response Quiz",
    titleDisplay = false,
    src = "https://digital-learning-ilos.s3.ca-central-1.amazonaws.com/showcase/lessons/quiz.html",
    height = "800",
    width = "100",
    heightType = "px",
    widthType = "%",
  } = componentState;

  const handleTitleInput = (e) => {
    setState({ title: e.target.value });
  };

  // const [showTitle, setShowTitle] = useState(true);
  const handleDisplayTitle = (e) => {
    if (e.target.checked) {
      setState({ titleDisplay: true });
    } else if (e.target.checked === false) {
      setState({ titleDisplay: false });
    }
  };

  console.log(titleDisplay);

  const handleSrcInput = (e) => {
    setState({ src: e.target.value });
  };

  const handleHeightType = (e) => {
    setState({ heightType: e.target.value });
  };
  const handleHeightInput = (e) => {
    setState({ height: e.target.value });
  };

  const handleWidthType = (e) => {
    setState({ widthType: e.target.value });
  };

  const handleWidthInput = (e) => {
    setState({ width: e.target.value });
  };

  return (
    <div
      className={styles.iFrameConfigContainer}
      data-testid="iFrameConfigContainer"
    >
      <EditPanelIcon title="iFrame" icon={<CropDin />} />
      <div className={styles.iFrameConfigWrapper}>
        <label htmlFor="iFrameConfigTitle">
          iFrame Title (required):
          <input
            data-testid="iFrameConfigTitle"
            id="iFrameConfigTitle"
            type="text"
            value={title}
            onChange={handleTitleInput}
          />
        </label>
        <label htmlFor="iFrameConfigTitleDisplay">
          Display title (optional)
          <input
            type="checkbox"
            defaultChecked={titleDisplay}
            data-testid="iFrameConfigTitleDisplay"
            onClick={handleDisplayTitle}
          />
        </label>
        <label htmlFor="iFrameConfigSrc">
          Content to be displayed in iFrame (URL):
          <input
            data-testid="iFrameConfigSrc"
            id="iFrameConfigSrc"
            type="url"
            pattern="https://.+"
            placeholder="https://www.example.com"
            value={src}
            onChange={handleSrcInput}
            onInvalid={(e) =>
              e.target.setCustomValidity(
                "Invalid URL.  Please ensure URL begins with 'https://'"
              )
            }
            onInput={(e) => e.target.setCustomValidity("")}
          />
        </label>
        <div className={styles.heightRadioContainer}>
          <label htmlFor="heightPixels">Pixels</label>
          <input
            defaultChecked={heightType === "px" ? true : false}
            type="radio"
            name="heightType"
            id="heightPixels"
            value="px"
            onChange={handleHeightType}
          />
          <label htmlFor="heightPercent">Percentage</label>
          <input
            defaultChecked={heightType === "%" ? true : false}
            type="radio"
            name="heightType"
            id="heightPercent"
            value="%"
            onChange={handleHeightType}
          />
        </div>
        <label htmlFor="iFrameConfigHeight">
          iFrame Height:
          <input
            data-testid="iFrameConfigHeight"
            id="iFrameConfigHeight"
            type="number"
            value={height}
            onChange={handleHeightInput}
            min="0"
            max={heightType === "%" ? 100 : null}
          />
        </label>
        <div className={styles.widthRadioContainer}>
          <label htmlFor="widthPixels">Pixels</label>
          <input
            defaultChecked={widthType === "px" ? true : false}
            type="radio"
            name="widthType"
            id="widthPixels"
            value="px"
            onClick={handleWidthType}
          />
          <label htmlFor="widthPercent">Percentage</label>
          <input
            defaultChecked={widthType === "%" ? true : false}
            type="radio"
            name="widthType"
            id="widthPercent"
            value="%"
            onClick={handleWidthType}
          />
        </div>
        <label htmlFor="iFrameConfigWidth">
          iFrame Width:
          <input
            data-testid="iFrameConfigWidth"
            id="iFrameConfigWidth"
            type="number"
            value={width}
            onChange={handleWidthInput}
            min="0"
            max={widthType === "%" ? 100 : null}
          />
        </label>
      </div>
    </div>
  );
};

export default IFrameConfig;

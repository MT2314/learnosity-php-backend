import React from "react";

import EditPanelIcon from "../EditPanelIcon";

import { CropDin } from "@mui/icons-material/";

import styles from "./styles/IFrameConfig.module.scss";

const IFrameConfig = ({ componentState = {}, setState = () => {} }) => {
  const {
    title = "Weighted Response Quiz",
    titleDisplay = false,
    url = "https://digital-learning-ilos.s3.ca-central-1.amazonaws.com/showcase/lessons/quiz.html",
    src = "https://digital-learning-ilos.s3.ca-central-1.amazonaws.com/showcase/lessons/quiz.html",
    height = "500",
    width = "900",
    heightType = "px",
    widthType = "%",
  } = componentState;

  const handleTitleInput = (e) => {
    setState({ title: e.target.value });
  };

  const handleDisplayTitle = (e) => {
    if (e.target.checked) {
      setState({ titleDisplay: true });
    } else if (e.target.checked === false) {
      setState({ titleDisplay: false });
    }
  };

  const handleSrcInput = (e) => {
    setState({ url: e.target.value });
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

  const verifyIFrameSettings = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        setState({ src: url });
        alert("URL successful.");
      } else {
        setState({ src: "" });
        alert(
          "Sorry, this URL is not able to be added to iFrame.  Please try a different URL."
        );
      }
    } catch (error) {
      setState({ src: "" });
      alert(
        "Sorry, this URL is not able to be added to iFrame.  Please try a different URL."
      );
    }
  };

  return (
    <div
      className={styles.iFrameConfigContainer}
      data-testid="iFrameConfigContainer"
    >
      <EditPanelIcon title="iFrame" icon={<CropDin />} />
      <div className={styles.iFrameConfigWrapper}>
        <form
          className={styles.iFrameConfigForm}
          onSubmit={verifyIFrameSettings}
        >
          <label
            htmlFor="iFrameConfigTitle"
            className={styles.iFrameConfigLabel}
          >
            iFrame Title (required):
            <input
              data-testid="iFrameConfigTitle"
              id="iFrameConfigTitle"
              className={styles.iFrameConfigTextInput}
              type="text"
              value={title}
              required
              onChange={handleTitleInput}
            />
          </label>
          <label
            htmlFor="iFrameConfigTitleDisplay"
            className={styles.iFrameConfigLabel}
          >
            Display title (optional)
            <input
              type="checkbox"
              id="iFrameConfigTitleDisplay"
              checked={titleDisplay ? true : false}
              data-testid="iFrameConfigTitleDisplay"
              onChange={handleDisplayTitle}
              title="Display Title Checkbox"
            />
          </label>
          <label htmlFor="iFrameConfigSrc" className={styles.iFrameConfigLabel}>
            Content to be displayed in iFrame (URL):
            <input
              data-testid="iFrameConfigSrc"
              className={styles.iFrameConfigTextInput}
              id="iFrameConfigSrc"
              type="url"
              pattern="https://.+"
              placeholder="https://www.example.com"
              value={url}
              required
              onChange={handleSrcInput}
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Invalid URL.  Please ensure URL begins with 'https://'"
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </label>
          <button type="submit">Verify iFrame URL</button>
        </form>
        <div className={styles.iFrameConfigSizeContainer}>
          <p className={styles.iFrameConfigSizeSettings}>
            iFrame Size Options:
          </p>
          <div className={styles.heightRadioContainer}>
            <label htmlFor="heightPixels" className={styles.iFrameConfigLabel}>
              Pixels
            </label>
            <input
              checked={heightType === "px" ? true : false}
              type="radio"
              name="heightType"
              id="heightPixels"
              value="px"
              onChange={handleHeightType}
            />
            <label htmlFor="heightPercent" className={styles.iFrameConfigLabel}>
              Percentage
            </label>
            <input
              checked={heightType === "%" ? true : false}
              type="radio"
              name="heightType"
              id="heightPercent"
              value="%"
              onChange={handleHeightType}
            />
          </div>
          <label
            htmlFor="iFrameConfigHeight"
            className={styles.iFrameConfigLabel}
          >
            iFrame Height:
            <input
              data-testid="iFrameConfigHeight"
              id="iFrameConfigHeight"
              className={styles.sizeInput}
              type="number"
              value={height}
              onChange={handleHeightInput}
              min="0"
              max={heightType === "%" ? 100 : null}
            />
          </label>
          <div className={styles.widthRadioContainer}>
            <label htmlFor="widthPixels" className={styles.iFrameConfigLabel}>
              Pixels
            </label>
            <input
              checked={widthType === "px" ? true : false}
              type="radio"
              name="widthType"
              id="widthPixels"
              value="px"
              onChange={handleWidthType}
            />
            <label htmlFor="widthPercent" className={styles.iFrameConfigLabel}>
              Percentage
            </label>
            <input
              checked={widthType === "%" ? true : false}
              type="radio"
              name="widthType"
              id="widthPercent"
              value="%"
              onChange={handleWidthType}
            />
          </div>
          <label
            htmlFor="iFrameConfigWidth"
            className={styles.iFrameConfigLabel}
          >
            iFrame Width:
            <input
              data-testid="iFrameConfigWidth"
              id="iFrameConfigWidth"
              className={styles.sizeInput}
              type="number"
              value={width}
              onChange={handleWidthInput}
              min="0"
              max={widthType === "%" ? 100 : null}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default IFrameConfig;

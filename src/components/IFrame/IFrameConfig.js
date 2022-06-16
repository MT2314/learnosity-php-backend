import React from "react";

import EditPanelIcon from "../EditPanelIcon";

import { CropDin } from "@mui/icons-material/";

import styles from "./styles/IFrameConfig.module.scss";

const IFrameConfig = ({ componentState = {}, setState = () => {} }) => {
  const {
    title = "Weighted Response Quiz",
    titleDisplay = false,
    url = "",
    src = "",
    height = "500",
    width = "900",
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
          <label
            htmlFor="iFrameConfigHeight"
            className={styles.iFrameConfigLabel}
          >
            Height (px):
            <input
              data-testid="iFrameConfigHeight"
              id="iFrameConfigHeight"
              className={styles.sizeInput}
              type="number"
              value={height}
              onChange={handleHeightInput}
              min="0"
            />
          </label>
          <div className={styles.widthContainer}>
            <label
              htmlFor="iFrameConfigWidth"
              className={styles.iFrameConfigLabel}
            >
              Width:
              <input
                data-testid="iFrameConfigWidth"
                id="iFrameConfigWidth"
                className={styles.sizeInput}
                type="number"
                value={width}
                onChange={handleWidthInput}
                min="0"
              />
            </label>
            <div className={styles.widthTypeDropdown}>
              <select
                name="widthType"
                id="widthType"
                onChange={handleWidthType}
                aria-label="units"
              >
                <option value="px">px</option>
                <option value="%">%</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IFrameConfig;

import React from "react";

import styles from "./styles/IFrame.module.scss";

export const defaultProps = {
  title: "",
  src: "",
  height: "100",
  width: "100",
  heightType: "px",
  widthType: "px",
};

const IFrame = ({ title, src, height, width, heightType, widthType }) => {
  return (
    <div className={styles.iFrameContainer} data-testid="iFrameContainer">
      <p className={styles.iFrameTitle}>{title ? title : "iFrame Title"}</p>
      <div className={styles.iFrameWrapper}>
        {src ? (
          <iframe
            data-testid="iFrame"
            title={title}
            src={src}
            frameBorder="0"
            className={styles.iFrame}
            style={{
              height: `${height}${heightType}`,
              width: `${width}${widthType}`,
            }}
          ></iframe>
        ) : (
          <div
            className={styles.iFramePlaceholder}
            data-testid="iFramePlaceholder"
            tab-index="0"
          ></div>
        )}
      </div>
    </div>
  );
};

export default IFrame;

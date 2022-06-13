import React from "react";

import styles from "./styles/IFrame.module.scss";

export const defaultProps = {
  title: "",
  titleDisplay: false,
  src: "",
  height: "500",
  width: "900",
  heightType: "px",
  widthType: "px",
};

const IFrame = ({
  title,
  titleDisplay = false,
  src,
  height,
  width,
  heightType,
  widthType,
}) => {
  return (
    <div className={styles.iFrameContainer} data-testid="iFrameContainer">
      <p className={styles.iFrameTitle}>
        {title && titleDisplay === true ? title : null}
      </p>
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

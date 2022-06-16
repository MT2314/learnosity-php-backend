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
  url,
  src,
  height,
  width,
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
            sandbox="allow-scripts allow-same-origin"
            className={styles.iFrame}
            style={{
              height: `${height}px`,
              width: `${width}${widthType}`,
            }}
          ></iframe>
        ) : (
          <div
            className={styles.iFramePlaceholder}
            data-testid="iFramePlaceholder"
          ></div>
        )}
      </div>
    </div>
  );
};

export default IFrame;

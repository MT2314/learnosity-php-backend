import React, { useContext, useEffect } from "react";
import { Paper } from "@mui/material";
import styles from "./styles/Image.module.scss";
import { ImageWidgetContext } from "./ImageProvider";
import FormattedText from "../FormattedText";

const Image = ({ uuid = "1" }) => {
  const context = useContext(ImageWidgetContext);

//   Sets the image to either the state of the UUID in the store or the default values.
  const { imgSize = "default", uploadedImg = "", imgLink = "", alt = "", longDesc = "" } = context[uuid] || context.imageDefault;
   console.log(uuid, imgSize, alt)
  let imgSizeStyles = {};

  if (imgSize === "default") {
    imgSizeStyles = {
      width: "auto",
    };
  } else if (imgSize === "small") {
    imgSizeStyles = {
      width: "256px",
    };
  } else if (imgSize === "medium") {
    imgSizeStyles = {
      width: "512px",
    };
  } else if (imgSize === "large") {
    imgSizeStyles = {
      width: "1024px",
    };
  }

  return (
    <Paper className={styles.Image__container} elevation={0}>
      <div className={styles.Image__canvasImgContainer}>
        {uploadedImg ? (
          // If image has been uploaded
          <>
            {/* add link to image */}
            {imgLink ? (
              <a href={imgLink} className={styles.Image__imgLink} target="__blank">
                <img src={uploadedImg} alt={alt} className={styles.Image__img} style={imgSizeStyles} />
              </a>
            ) : (
              // no link added to img
              <>
                <img src={uploadedImg} alt={alt} className={styles.Image__img} tabIndex="0" style={imgSizeStyles} />
              </>
            )}
          </>
        ) : (
          // If no image has been uploaded
          <>
            <div className={styles.Image__outline} tabIndex="0"></div>
          </>
        )}
        {longDesc && <p className={styles.Image__longDesc}>{longDesc}</p>}
        <FormattedText placeHolderText="Enter Caption" />
        <hr />
        <FormattedText placeHolderText="Enter Credit" />
      </div>
    </Paper>
  );
};

export default Image;

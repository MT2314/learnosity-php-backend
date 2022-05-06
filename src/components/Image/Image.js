import React from 'react';
import { Paper } from "@mui/material";
import styles from "./styles/Image.module.scss";
import FormattedText from "../FormattedText";

export const defaultProps = { imgSize: "default", uploadedImg: "", imgLink: "", alt: "", longDesc: "", caption: null, credit: null, };

const Image = ({ setProp, imgSize = "default", uploadedImg = "", imgLink = "", alt = "", longDesc = "", caption = null, credit = null }) => {
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
        <FormattedText placeHolderText="Enter Caption" body={caption} setProp={(stateUpdate) => setProp({caption: stateUpdate.body})} />
        <hr />
        <FormattedText placeHolderText="Enter Credit" body={credit} setProp={(stateUpdate) => setProp({credit: stateUpdate.body})} />
      </div>
    </Paper>
  );
};

export default Image;

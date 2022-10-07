import React from "react";
import { Paper } from "@mui/material";
import styles from "./styles/Image.module.scss";
import FormattedText from "../FormattedText";
import DragLabel from "../../Utility/DragLabel";

export const defaultProps = {
  imgSize: "default",
  uploadedImg: "",
  imgLink: "",
  alt: "",
  longDesc: "",
  caption: null,
  credit: null,
};


const Image = ({
  setProp,
  imgSize = "default",
  uploadedImg = "",
  imgLink = "",
  alt = "",
  longDesc = "",
  caption = null,
  credit = null,
}) => {
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
    <>
      {/* on drag <DragLabel/> shows the components name */}
      {/* <DragLabel/> */}
      <Paper
        data-testid="image-container"
        className={styles.imageContainer}
        elevation={0}
      >
        {uploadedImg ? (
          // If image has been uploaded
          <>
            {/* add link to image */}
            {imgLink ? (
              <a
                data-testid="image-link"
                href={imgLink}
                className={styles.imageLink}
                target="__blank"
              >
                <img
                  data-testid="image"
                  src={uploadedImg}
                  alt={alt}
                  className={styles.uploadedImg}
                  style={imgSizeStyles}
                />
              </a>
            ) : (
              // no link added to img
              <>
                <img
                  src={uploadedImg}
                  alt={alt}
                  className={styles.uploadedImg}
                  tabIndex="0"
                  style={imgSizeStyles}
                />
              </>
            )}
          </>
        ) : (
          // If no image has been uploaded
          <>
            <div
              data-testid="image-placeholder"
              className={styles.placeholderImg}
              tabIndex="0"
            ></div>
          </>
        )}
        {longDesc && <p className={styles.longDescription}>{longDesc}</p>}
        <div data-testid="image-caption" className={styles.imgCaption}>
          <FormattedText
            placeHolderText="Enter Caption"
            body={caption}
            setProp={(stateUpdate) => setProp({ caption: stateUpdate.body })}
          />
        </div>
        <hr />
        <div data-testid="image-credit" className={styles.imgCredit}>
          <FormattedText
            placeHolderText="Enter Credit"
            body={credit}
            setProp={(stateUpdate) => setProp({ credit: stateUpdate.body })}
          />
        </div>
      </Paper>
    </>
  );
};

export default Image;

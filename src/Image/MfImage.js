import React from "react";
import { Paper } from "@mui/material";
import styles from "./MfImage.module.scss";
// import background from './assets/imageIcon.svg';

const MfImage = () => {

   return(
      <Paper
        className={styles.Image__holdingbox}
        elevation={0}
      >
          <div 
            className={styles.Image__outline}
            tabIndex="0"
          ></div>
          <textarea
            placeholder="Type caption here..."
            aria-label="Add caption text to image"
            rows={2}
            className={styles.Image__caption}
          ></textarea>
        </Paper>
   )
}

export default MfImage;
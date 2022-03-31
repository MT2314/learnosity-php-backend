import React, {useContext} from "react";
import { Paper } from "@mui/material";
import styles from "./MfImage.module.scss";
import { ImageWidgetContext } from "./ImageProvider";

const MfImage = () => {

  const context = useContext(ImageWidgetContext);

   return(
      <Paper
        className={styles.Image__holdingbox}
        elevation={0}
      >
          <div 
            className={styles.Image__outline}
            tabIndex="0"
          >
            <img src={context.uploadedImg} alt={context.alt}/>
          </div>
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
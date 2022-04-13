import React, { useContext, useState } from "react";
import { Paper } from "@mui/material";
import styles from "./Image.module.scss";
import { ImageWidgetContext } from "./ImageProvider";

const Image = () => {

   const context = useContext(ImageWidgetContext);
   const [ credit, setCredit ] = useState('')

   return(
      <Paper
         className={styles.Image__container}
         elevation={0}
      >
         { context.uploadedImg ? (
            // If image has been uploaded
            <>
            {/* add link to image */}
            {
               context.imgLink ?
               <a href={context.imgLink}>
                  <div 
                     className={styles.Image__canvasImgContainer}
                     tabIndex="0"
                  >
                     <img
                        src={context.uploadedImg}
                        alt={context.alt}
                        className={styles.Image__img}
                     />
                  </div>
               </a>
               :
               // no link added to img
               <div 
               className={styles.Image__canvasImgContainer}
               tabIndex="0"
            >
               <img
                  src={context.uploadedImg}
                  alt={context.alt}
                  className={styles.Image__img}
                  tabIndex="0"
               />
            </div>

            }
            </>
            ) : (
            // If no image has been uploaded
            <div
               className={styles.Image__holdingbox}
            >
               <div className={styles.Image__outline} tabIndex="0"></div>
               <textarea
                  placeholder="Type caption here..."
                  aria-label="Add caption text to image"
                  rows={2}
                  className={styles.Image__caption}
               ></textarea>
            </div>
            )
         }
         <label hmtlFor='credit' className={styles.srOnly}>Enter credit for image</label>
         <input type="text"
                name="credit"
                id="credit"
                value={credit}
                placeholder="add image credit"
                className={styles.Image__caption}
                onChange={e => setCredit(e.target.value)}
         />
      </Paper>
   );
};

export default Image;
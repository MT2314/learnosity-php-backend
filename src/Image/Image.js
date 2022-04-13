import React, { useContext, useState } from "react";
import { Paper } from "@mui/material";
import styles from "./styles/Image.module.scss";
import { ImageWidgetContext } from "./ImageProvider";

const Image = () => {

   const context = useContext(ImageWidgetContext);
   const [ credit, setCredit ] = useState('')

   let imgSizeStyles = {};
	
   if (context.imgSize === "default") {
      imgSizeStyles = {
         width: 'auto'
      }
   } else if (context.imgSize === "small") {
      imgSizeStyles = {
         width: '256px'
      }
   } else if (context.imgSize === "medium") {
      imgSizeStyles = {
         width: '1000px'
      }
   } else if (context.imgSize === "large") {
      imgSizeStyles = {
         width: '1800px'
      }
   };

   return(
      <Paper
         className={styles.Image__container}
         elevation={0}
      >
			<div 
            // className={
				// 	context.uploadedImg ? `${styles.Image__canvasImgContainer} ${styles.Image__holdingbox}`
				// 	: styles.Image__holdingbox
				// }
				className={styles.Image__canvasImgContainer}
         >
         {context.uploadedImg ? (
            // If image has been uploaded
            <>
            {/* add link to image */}
            {context.imgLink ?
               <a href={context.imgLink}>
                  <img
                     src={context.uploadedImg}
                     alt={context.alt}
                     className={styles.Image__img}
                     style={imgSizeStyles}
                  />
               </a>
               :
               // no link added to img
               <>
               <img
                  src={context.uploadedImg}
                  alt={context.alt}
                  className={styles.Image__img}
                  tabIndex="0"
                  style={imgSizeStyles}
               />
            	</>
            }
            </>
            ) : (
            // If no image has been uploaded
            <>
               <div className={styles.Image__outline} tabIndex="0"></div>
            </>
            )
         }
				<textarea
         	   placeholder="Type caption here..."
         	   aria-label="Add caption text to image"
         	   rows={2}
         	   className={styles.Image__caption}
         	></textarea>
         	<label hmtlFor='credit' className={styles.srOnly}>Enter credit for image</label>
         	<input
					type="text"
         	   name="credit"
         	   id="credit"
         	   value={credit}
         	   placeholder="add image credit"
         	   className={styles.Image__caption}
         	   onChange={e => setCredit(e.target.value)}
         	/>
			</div>
      </Paper>
   );
};

export default Image;
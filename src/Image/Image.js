import React, { useContext, useState } from "react";
import { Paper } from "@mui/material";
import styles from "./styles/Image.module.scss";
import { ImageWidgetContext } from "./ImageProvider";
import FormattedText from "../FormattedText";

const Image = () => {

   const context = useContext(ImageWidgetContext);

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
         width: '512px'
      }
   } else if (context.imgSize === "large") {
      imgSizeStyles = {
         width: '1024px'
      }
   };

   return(
      <Paper
         className={styles.Image__container}
         elevation={0}
      >
			<div className={styles.Image__canvasImgContainer}>
         {context.uploadedImg ? (
            // If image has been uploaded
            <>
            {/* add link to image */}
            {context.imgLink ?
               <a 
                  href={context.imgLink} 
                  className={styles.Image__imgLink}
                  target="__blank">
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
         {
            context.longDesc &&
            <p className={styles.Image__longDesc}>{context.longDesc}</p>
         }
            <FormattedText placeHolderText="Enter Caption" />
            <hr />
            <FormattedText placeHolderText="Enter Credit" />
			</div>
      </Paper>
   );
};

export default Image;
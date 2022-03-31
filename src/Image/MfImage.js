import React, {useContext} from "react";
import styles from "./MfImage.module.scss";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import background from './assets/imageIcon.svg';
import {ImageWidgetContext} from "./MfImageConfig"

const MfImage = () => {

  const context = useContext(ImageWidgetContext);

   return(
      <div className={styles.Image__holdingbox}>
          <div 
            className={styles.Image__outline}
            style={{ backgroundImage: `url(${background})`, backgroundRepeat:'no-repeat', backgroundPosition:'center'}}
          ><img src={context.uploadedImg} alt={context.alt}/></div>
          <textarea
            placeholder="Type caption here..."
            aria-label="Add caption text to image"
            rows={2}
            className={(styles.Image__input, styles.Image__caption)}
          ></textarea>
        </div>
   )
}

export default MfImage;
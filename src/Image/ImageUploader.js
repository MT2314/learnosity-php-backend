import React, { useState, useContext } from 'react';
import { useDropzone } from 'react-dropzone'; 
import { ImageWidgetContext } from './ImageProvider';
import styles from './styles/ImageConfig.module.scss';

const ImageUploader = ({selectedUUID = "1"}) => {

   const context = useContext(ImageWidgetContext);
   const { alt = "",  } = context[selectedUUID] || {}

   const [ count, setCount ] = useState(0);
   const [file, setFile] = useState([]);

   const handleClearImageFields = () => {
      setCount(count + 1);
      if (count > 0) {
         context.updateReferencedContext(selectedUUID, { 
            alt: "",
            longDesc: "",
            imgLink: "",
            imgSize: "default"
         });
      } else {
         return
      };
   };

   const imageValidator = (image) => {
      if (image.size > 5000000) {
         alert('Image size is greater than 5MB.  Please try uploading a different image.');
      } else if (image.type !== 'image/jpeg' && image.type !== 'image/gif' && image.type !== 'image/png' && image.type !== 'image/svg+xml') {
         alert('Image type not accepted.  Please try uploading a different type of image.');
      }
   };

//  drop zone image uploader configuration
  const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/jpg, image/jpeg, image/gif, image/png, image/svg+xml',
      maxFiles: 1,
      multiple: false,
      maxSize: 5000000,
      validator: imageValidator,
      onDrop: acceptedFiles => {
         handleClearImageFields()
         context.updateReferencedContext(selectedUUID, {uploadedImg: URL.createObjectURL(acceptedFiles[0])});
         setFile({preview: URL.createObjectURL(acceptedFiles[0])});
         URL.revokeObjectURL(file.preview);
      }
   });

      // image preview
      const thumbs =  (
         <div className={styles.ImageConfig__thumbOuter}>
            <div className={styles.ImageConfig__thumbInner}>
               <img
                  src={file.preview}
                  alt={alt}
                  className={styles.ImageConfig__thumbnailImg}
               />
            </div>
         </div>
      );

   return(
      <div className={styles.ImageConfig__section}>
         {/* Image thumbnail */}
         <aside className={styles.ImageConfig__thumbnailContainer}>
            { file.length !== 0 && thumbs }
         </aside>
         {/* Image Uploader */}
         <div {...getRootProps()} className={styles.ImageConfig__uploader}>
            <label for="image-uploader">Drag 'n' drop some files here, or  click to open the file dialog</label>
            <input name="image-uploader" {...getInputProps()} />
         </div>
         <p className={styles.ImageConfig__uploadSize}>
            Max file size: 5mb, accepted: .jpg, .gif, .png, .svg
         </p>
      </div>
   )
};

export default ImageUploader;
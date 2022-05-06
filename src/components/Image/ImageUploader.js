import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone'; 
import styles from './styles/ImageUploader.module.scss';

const ImageUploader = ({state, setState}) => {


   // As is this will allow the unpopulated panel to change the default values (which it shouldn't)
   // but the panel won't populate on the Authoring side without having a selected UUID

   const { alt = "", uploadedImg = ""  } = state

   const [ count, setCount ] = useState(0);
   const [file, setFile] = useState([]);

   const handleClearImageFields = () => {
      setCount(count + 1);
      if (count > 0) {
         setState({ 
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
         setState({uploadedImg: URL.createObjectURL(acceptedFiles[0])});
         setFile({preview: URL.createObjectURL(acceptedFiles[0])});
         URL.revokeObjectURL(file.preview);
      }
   });

      // image preview
      const thumbs =  (
         <div className={styles.thumbOuter}>
            <div className={styles.thumbInner}>
               <img
                  src={uploadedImg}
                  alt={alt}
                  className={styles.thumbnailImg}
               />
            </div>
         </div>
      );

   return(
      <div className={styles.container}>
         {/* Image thumbnail */}
         <aside className={styles.thumbnailContainer}>
            { file.length !== 0 && thumbs }
         </aside>
         {/* Image Uploader */}
         <div {...getRootProps()} className={styles.imageUploader}>
            <label for="image-uploader">Drag 'n' drop some files here, or  click to open the file dialog</label>
            <input name="image-uploader" {...getInputProps()} />
         </div>
         <p className={styles.uploadSize}>
            Max file size: 5mb, accepted: .jpg, .gif, .png, .svg
         </p>
      </div>
   )
};

export default ImageUploader;
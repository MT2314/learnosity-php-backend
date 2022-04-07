import React, { useState, useEffect, useContext } from 'react';
import { useDropzone } from 'react-dropzone'; 
import styles from './ImageConfig.module.scss';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { ImageWidgetContext } from './ImageProvider';

function ImageConfig() {

  const context = useContext(ImageWidgetContext);
  
  const [file, setFile] = useState([]);
 
   // styles for thumbnail
   const thumbsContainer = {
      display: "flex",
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16
   };

   const thumb = {
      display: 'inline-flex',
      border: '1px solid #eaeaea',
      marginBottom: 8,
      marginRight: 8,
      width: 100,
      height: 100,
      padding: 4,
      boxSizing: 'border-box'
   };
 
   const thumbInner = {
      display: 'flex',
      minWidth: 0,
      overflow: 'hidden'
   };
 
   const img = {
      display: 'block',
      width: 'auto',
      height: '100%'
   };
   
   // image preview
   const thumbs =  (
      <div style={thumb}>
         <div style={thumbInner}>
            <img
               src={file.preview}
               alt={context.alt}
               style={img}
            />
         </div>
      </div>
   );

   const imageValidator = (image) => {
      if (image.size > 5000000) {
         alert('Image size is greater than 5MB.  Please try uploading a different image.');
      } else if (image.type !== 'image/jpeg' && image.type !== 'image/gif' && image.type !== 'image/png' && image.type !== 'image/svg') {
         alert('Image type not accepted.  Please try uploading a different type of image.');
      }
   };

//  drop zone image uploader configuration
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
      accept: 'image/jpg, image/jpeg, image/gif, image/png, image/svg+xml',
      maxFiles: 1,
      multiple: false,
      maxSize: 5000000,
      validator: imageValidator,
      onDrop: acceptedFiles => {
         context.updateContext({uploadedImg: URL.createObjectURL(acceptedFiles[0])})
         setFile({preview: URL.createObjectURL(acceptedFiles[0])});
      }
   });
   
   useEffect(() => {
     // Make sure to revoke the data uris to avoid memory leaks
     URL.revokeObjectURL(file.preview);
   }, [file]);
 
   return (
      <section className={styles.ImageConfig__editPanelContainer}>
         {/* Edit Panel Component Title */}
         <div className={styles.ImageConfig__componentTitleSection}>
            <InsertPhotoOutlinedIcon className={styles.ImageConfig__componentTitleIcon} />
            <p className={styles.ImageConfig__componentTitle}>Image</p>
         </div>
         {/* Image thumbnail */}
         <aside style={thumbsContainer}>
            {file.length !== 0 && thumbs }
         </aside>
         {/* Image Uploader */}
         <div {...getRootProps({className: `${styles.ImageConfig__uploader}`})}>
            <label>
               <input {...getInputProps()} />
               {file.length < 1 ? 'Upload' : 'Replace Image'}
            </label>
         </div>
         <p className={styles.ImageConfig__uploadSize}>
            Max file size: 5mb, accepted: .jpg, .gif, .png, .svg
         </p>
         <h2 className={styles.ImageConfig__altTextH2}>Alt Text</h2>
         <p className={styles.ImageConfig__altTextP}>
            This text will be used by screen readers, search engines, or when the
            image can't be loaded.
         </p>
         <textarea
            name={`image-alt`}
            id={`image-alt`}
            aria-label="Add alt text to image"
            rows="4"
            value={context.alt}
            onChange={(e) => context.updateContext({alt: e.target.value })}
            className={styles.ImageConfig__altTextInput}
            placeholder="Type alt text here..."
         ></textarea>
      </section>
   );
 }

export default ImageConfig;
import React, {useState, useEffect} from 'react';
import { useDropzone } from 'react-dropzone'; 
import styles from './MfImageConfig.module.scss';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

function MfImageConfig(props) {
   const [files, setFiles] = useState([]);
   const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      maxFiles: 1,
      multiple: false,
      maxSize: 5000000,
      onDrop: acceptedFiles => {
         setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
         })));
      }
   });
   
   const thumbs = files.map(file => (
     <div className={styles.Image__thumbOuter} key={file.name}>
       <div className={styles.Image__thumbInner}>
         <img
           src={file.preview}
           className={styles.Image__thumbnailImg}
         />
       </div>
     </div>
   ));
 
   useEffect(() => {
     // Make sure to revoke the data uris to avoid memory leaks
     files.forEach(file => URL.revokeObjectURL(file.preview));
   }, [files]);
 
   return (
      <section className={styles.MfImageConfig__editPanelContainer}>
         {/* Edit Panel Component Title */}
         <div className={styles.MfImageConfig__componentTitleSection}>
            <InsertPhotoOutlinedIcon className={styles.MfImageConfig__componentTitleIcon} />
            <p className={styles.MfImageConfig__componentTitle}>Image</p>
         </div>
         {/* Image thumbnail */}
         <aside className={styles.MfImageConfig__thumbnailContainer}>
            {thumbs}
         </aside>
         {/* Image Uploader */}
         <div {...getRootProps({className: `${styles.MfImageConfig__uploader}`})}>
            <input {...getInputProps()} />
            {files.length < 1 ? 'Upload' : 'Replace Image'}
         </div>
         <p className={styles.MfImageConfig__uploadSize}>Max file size: 5mb, accepted: .jpg, .gif, .png, .svg</p>
         <h2 className={styles.MfImageConfig__altTextH2}>Alt Text</h2>
         <p className={styles.MfImageConfig__altTextP}>
            This text will be used by screen readers, search engines, or when the
            image can't be loaded.
         </p>
         <textarea
            name={`image-alt`}
            id={`image-alt`}
            aria-label="Add alt text to image"
            rows="4"
            className={styles.MfImageConfig__altTextInput}
            placeholder="Type alt text here..."
         ></textarea>
      </section>
   );
 }

export default MfImageConfig;
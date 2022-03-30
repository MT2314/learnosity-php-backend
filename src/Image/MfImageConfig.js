import React, {useState, useEffect} from 'react';
import { useDropzone } from 'react-dropzone'; 
import styles from './MfImage.module.scss';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

const thumbsContainer = {
   display: 'flex',
   flexDirection: 'row',
   flexWrap: 'wrap',
   marginTop: 16
 };
 
 const thumb = {
   display: 'inline-flex',
   borderRadius: 2,
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
 
 
 function MfImageConfig(props) {
   const [files, setFiles] = useState([]);
   const {getRootProps, getInputProps} = useDropzone({
     accept: 'image/*',
     onDrop: acceptedFiles => {
       setFiles(acceptedFiles.map(file => Object.assign(file, {
         preview: URL.createObjectURL(file)
       })));
     }
   });
   
   const thumbs = files.map(file => (
     <div style={thumb} key={file.name}>
       <div style={thumbInner}>
         <img
           src={file.preview}
           style={img}
         />
       </div>
     </div>
   ));
 
   useEffect(() => {
     // Make sure to revoke the data uris to avoid memory leaks
     files.forEach(file => URL.revokeObjectURL(file.preview));
   }, [files]);
 
   return (
      <section className={styles.Image__editPanelContainer}>
         {/* Edit Panel Component Title */}
         <div className={styles.Image__componentTitleSection}>
            <InsertPhotoOutlinedIcon className={styles.Image__componentTitleIcon} />
            <p className={styles.Image__componentTitle}>Image</p>
         </div>
         {/* Image thumbnail */}
         <aside style={thumbsContainer}>
            {thumbs}
         </aside>
         {/* Image Uploader */}
         <div {...getRootProps({className: `${styles.Image__uploader}`})}>
            <input {...getInputProps()} />
            Upload
         </div>
         <p className={styles.Image__uploadSize}>Max file size: 5mb, accepted: .jpg, .gif, .png, .svg</p>
         <h2 className={styles.Image__altTextH2}>Alt Text</h2>
         <p className={styles.Image__altTextP}>
            This text will be used by screen readers, search engines, or when the
            image can't be loaded.
         </p>
         <textarea
            name={`image-alt`}
            id={`image-alt`}
            aria-label="Add alt text to image"
            rows="4"
            className={styles.Image__altTextInput}
            placeholder="Type alt text here..."
         ></textarea>
      </section>
   );
 }

export default MfImageConfig;
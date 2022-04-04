import React, {useState, useEffect, useContext} from 'react';
import { useDropzone } from 'react-dropzone'; 
import styles from './MfImageConfig.module.scss';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import {ImageWidgetContext } from './ImageProvider';

function MfImageConfig() {

  const context = useContext(ImageWidgetContext);
  
  const [file, setFile] = useState([]);
 
// styles for thumbnail
const thumbsContainer = {
   display: "file",
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
   // image preview
   const thumbs =  <div style={thumb}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
          />
        </div>
      </div>

//  drop zone image uploader configuration
  const {getRootProps, getInputProps} = useDropzone({
      accept: '.jpg, .jpeg, .gif, .png, .svg',
      maxFiles: 1,
      multiple: false,
      maxSize: 5000000,
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
      <section className={styles.MfImageConfig__editPanelContainer}>
         {/* Edit Panel Component Title */}
         <div className={styles.MfImageConfig__componentTitleSection}>
            <InsertPhotoOutlinedIcon className={styles.MfImageConfig__componentTitleIcon} />
            <p className={styles.MfImageConfig__componentTitle}>Image</p>
         </div>
         {/* Image thumbnail */}
         <aside style={thumbsContainer}>
            {file.length !== 0 && thumbs }
         </aside>
         {/* Image Uploader */}
         <div {...getRootProps({className: `${styles.MfImageConfig__uploader}`})}>
            <input {...getInputProps()} />
            {file.length < 1 ? 'Upload' : 'Replace Image'}
         </div>
         <p className={styles.MfImageConfig__uploadSize}>
            Max file size: 5mb, accepted: .jpg, .gif, .png, .svg
         </p>
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
            value={context.alt}
            onChange={(e) => context.updateContext({alt: e.target.value })}
            className={styles.MfImageConfig__altTextInput}
            placeholder="Type alt text here..."
         ></textarea>
      </section>
   );
 }

export default MfImageConfig;
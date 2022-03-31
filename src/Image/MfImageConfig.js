import React, {useState, useEffect, createContext, useContext} from 'react';
import { useDropzone } from 'react-dropzone'; 
import styles from './MfImageConfig.module.scss';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { ImageProvider, ImageWidgetContext } from './ImageProvider';
 
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

  const context = useContext(ImageWidgetContext);
  
  const [files, setFiles] = useState([]);

 
  const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      maxFiles: 1,
      multiple: false,
      maxSize: 5000000,
      onDrop: acceptedFiles => {
        context.updateContext({uploadedImg: URL.createObjectURL(acceptedFiles[0])})
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
            Upload
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
            value={context.alt}
            onChange={(e) => context.updateContext({alt: e.target.value })}
            className={styles.MfImageConfig__altTextInput}
            placeholder="Type alt text here..."
         ></textarea>
      </section>
   );
 }

export default MfImageConfig;
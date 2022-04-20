import React, { useState, useContext } from 'react';
import { useDropzone } from 'react-dropzone'; 
import styles from './styles/ImageConfig.module.scss';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import NativeSelect from '@mui/material/NativeSelect';
import { ImageWidgetContext } from './ImageProvider';

function ImageConfig() {

  const context = useContext(ImageWidgetContext);

  const [ imgLink, setImgLink ] = useState("");
  const [ count, setCount ] = useState(0);
  const [file, setFile] = useState([]);
 
   // image preview
   const thumbs =  (
      <div className={styles.ImageConfig__thumbOuter}>
         <div className={styles.ImageConfig__thumbInner}>
            <img
               src={file.preview}
               alt={context.alt}
               className={styles.ImageConfig__thumbnailImg}
            />
         </div>
      </div>
   );

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
         context.updateContext({uploadedImg: URL.createObjectURL(acceptedFiles[0])});
         setFile({preview: URL.createObjectURL(acceptedFiles[0])});
         URL.revokeObjectURL(file.preview);
      }
   });
   
   const handleSubmit = (e) => {
      e.preventDefault();
      context.updateContext({ imgLink: imgLink });
   }

   const handleClearImageFields = () => {
      setCount(count + 1);
      setImgLink('');
      if (count > 0) {
         context.updateContext({ 
            alt: "",
            longDesc: "",
            imgLink: "",
            imgSize: "default"
         });
      } else {
         return
      };
   };

   return (
      <section className={styles.ImageConfig__editPanelContainer}>
         {/* Edit Panel Component Title */}
         <div className={styles.ImageConfig__componentTitleContainer}>
            <InsertPhotoOutlinedIcon className={styles.ImageConfig__componentTitleIcon} />
            <p className={styles.ImageConfig__componentTitle}>Image</p>
         </div>
         <div className={styles.ImageConfig__section}>
            {/* Image thumbnail */}
            <aside className={styles.ImageConfig__thumbnailContainer}>
               { file.length !== 0 && thumbs }
            </aside>
            {/* Image Uploader */}
            <div {...getRootProps()}>
               <div style={{border:"3px dotted black", display:"flex", flexDirection:"column", alignItems:"center"}}>
                  <p>Drag and Drop</p>
               <label className={styles.ImageConfig__uploader}>
                  <input {...getInputProps()} />
                  {file.length < 1 ? 'Upload Image' : 'Replace Image'}
               </label>
               </div>
            </div>
            <p className={styles.ImageConfig__uploadSize}>
               Max file size: 5mb, accepted: .jpg, .gif, .png, .svg
            </p>
         </div>
         <form onSubmit={handleSubmit} className={styles.ImageConfig__validationForm}>
            <div className={styles.ImageConfig__section}>
               <h2 className={styles.ImageConfig__imageH2}>Alt Text</h2>
               <label className={styles.ImageConfig__imageLabel} htmlFor="image-alt">
                  This text will be used by screen readers, search engines, or when the image can't be loaded.
               </label>
               <textarea
                  name={`image-alt`}
                  id={`image-alt`}
                  required
                  aria-label="Add alt text to image"
                  rows="4"
                  value={context.alt}
                  onChange={ (e) => context.updateContext({alt: e.target.value })}
                  className={styles.ImageConfig__altTextInput}
                  placeholder="Type alt text here..."
                  onInvalid={e => e.target.setCustomValidity("Alt text is required for all uploaded images.")}
                  onInput={e => e.target.setCustomValidity('')}
               ></textarea>
            </div>
            <div className={styles.ImageConfig__section}>
               <h2 className={styles.ImageConfig__imageH2}>Long Description</h2>
               <label className={styles.ImageConfig__imageLabel} htmlFor="long-desc">
                  This text will be used by screen readers, search engines, or when the image can't be   loaded.
               </label>
               <textarea
                  name="long-desc"
                  id="long-desc"
                  aria-label="Add a long description to the uploaded image"
                  rows="4"
                  value={context.longDesc}
                  onChange={ (e) => context.updateContext({longDesc: e.target.value })}
                  className={styles.ImageConfig__altTextInput}
                  placeholder="Type long description here..."
               ></textarea>
            </div>
            <div className={styles.ImageConfig__section}>
               <h2 className={styles.ImageConfig__imageH2}>Image Size</h2>
               <label
                  htmlFor="img-size"
                  className={styles.ImageConfig__imageLabel}
               >
                  Change the size of your uploaded image.
               </label>
               <NativeSelect
                  id="img-size"
                  name="img-size"
                  className={styles.ImageConfig__imageSizeDropdown}
                  onChange={(e) => context.updateContext({imgSize: e.target.value})}
                  defaultValue={"select"}
               >
                  <option value={"select"} disabled>Select Size</option>
                  <option value={"default"}>Default</option>
                  <option value={"small"}>Small</option>
                  <option value={"medium"}>Medium</option>
                  <option value={"large"}>Large</option>
               </NativeSelect>
            </div>
            <div className={styles.ImageConfig__section}>
               <h2 className={styles.ImageConfig__imageH2}>Add Link To Image</h2>
               {/* <form className={styles.ImageConfig__linkForm}> */}
                  <label htmlFor="urlImg" className={styles.ImageConfig__imageLabel}>Turn image into link to external webpage.</label>
                  <input
                     type="url"
                     name="urlImg"
                     id="urlImg"
                     placeholder="https://example.com"
                     pattern="https?://.+"
                     value={imgLink}
                     className={styles.ImageConfig__linkFormInput}
                     onChange={ e => setImgLink(e.target.value)}
                     onInvalid={e => e.target.setCustomValidity("Invalid URL.  Please make sure URL begins with 'http://' or 'https://")}
                     onInput={e => e.target.setCustomValidity("")}
                  />
                  {/* <button
                     type="submit"
                     className={styles.ImageConfig__linkFormButton}
                  >
                     Add Link
                  </button> */}
               {/* </form> */}
            </div>
            <button className={styles.ImageConfig__validationButton} type="submit">Apply to Image</button>
            {/* <button className={styles.ImageConfig__clearButton}>Clear All Fields</button> */}
         </form>
      </section>
   );
};

export default ImageConfig;
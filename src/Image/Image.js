import React, {useContext, useCallback, useState, useEffect } from 'react';
import { WidgetContext } from '../Provider';
import { useDropzone} from 'react-dropzone';

const Image = () => {

   const context = useContext(WidgetContext); 
   const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

   const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));


    useEffect(()=>{
       context.updateContext(
          {
             test:"testing"
          }
       )
    }, [acceptedFiles])
   
    
  return (
   <section className="container">
     <div {...getRootProps({className: 'dropzone'})}>
       <input {...getInputProps()} />
       <p>Drag 'n' drop some files here, or click to select files</p>
     </div>
     <aside>
      <h4>Files</h4>
      <p>{files}</p>
     </aside>
   </section>
 );
}

export default Image;
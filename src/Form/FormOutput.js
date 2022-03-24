import React, { useContext } from 'react';
import { WidgetContext } from '../Provider';

const FormOutput = () => {
   const context = useContext(WidgetContext);

   return(
      <div>
         <h3>Form output in Canvas</h3>
         <p>{context.userName}</p>
         <p>{context.userAge}</p>
         <p>{context.userFavFood}</p>
      </div>
   )
}

export default FormOutput;
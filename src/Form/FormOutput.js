import React, { useContext } from 'react';
import { WidgetContext } from '../App';

const FormOutput = () => {
   const context = useContext(WidgetContext);

   return(
      <div>
         form output: {context.userName}
      </div>
   )
}

export default FormOutput;
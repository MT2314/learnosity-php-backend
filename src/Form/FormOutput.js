import React, { useContext } from 'react';
import { WidgetContext } from '../App';

const FormOutput = () => {
   const context = useContext(WidgetContext);
   console.log(context)
   return(
      <div>
         form output: {context.form.userName}
      </div>
   )
}

export default FormOutput;
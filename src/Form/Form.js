
import React, { useState, useContext } from 'react';
import FormOutput from './FormOutput';
import { WidgetContext } from '../App';


const Form = () => {

   const context = useContext(WidgetContext)
   console.log("====>",context)

      const [ input, setInput ] = useState({
         userName:"",
         userAge:"",
         userFavFood:"",
      })


      const onSubmit = (event) => {
         event.preventDefault();
         console.log('submitted')
         context.updateContext("userName", "Taylor");
      }

   return(
      <form onSubmit={onSubmit}>
         <label htmlFor="userName">Name:</label>
         <input 
            type="text" 
            id="userName" 
            name="userName"
            value={input.userName}
            onChange={target => setInput({...input, userName:target.value})}  />

         <label for="userAge">Age:</label>
         <input 
            type="number" 
            id="userAge" 
            name="userAge"
            value={input.userAge}
            onChange={target => parseInt(setInput({...input, userAge:target.value}))}  />

         <label for="userFavFood">Favourite Food:</label>
         <input 
            type="text" 
            id="userFavFood" 
            name="userFavFood"
            value={input.userFavFood}
            onChange={target => setInput({...input, userFavFood: target.value})}
              />
         <button type='submit'>Submit</button>
      </form>
   )
}

export default Form;

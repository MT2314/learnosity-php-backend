
import React, { useState, useContext } from 'react';
import FormOutput from './FormOutput';
import { WidgetContext } from '../App';


const Form = () => {

   const context = useContext(WidgetContext)

      const [ input, setInput ] = useState({
         userName:"",
         userAge:"",
         userFavFood:"",
      })


      const onSubmit = (event) => {
         event.preventDefault();

         context.updateContext("userName", input.userName);
      }

   return(
      <form onSubmit={onSubmit}>
         <label htmlFor="userName">Name:</label>
         <input 
            type="text" 
            id="userName" 
            name="userName"
            value={input.userName}
            onChange={event => setInput({...input, userName: event.target.value})}  />

         <label htmlFor="userAge">Age:</label>
         <input 
            type="number" 
            id="userAge" 
            name="userAge"
            value={input.userAge}
            onChange={event => parseInt(setInput({...input, userAge:event.target.value}))}  />

         <label htmlFor="userFavFood">Favourite Food:</label>
         <input 
            type="text" 
            id="userFavFood" 
            name="userFavFood"
            value={input.userFavFood}
            onChange={event => setInput({...input, userFavFood: event.target.value})}
              />
         <button type='submit'>Submit</button>
      </form>
   )
}

export default Form;

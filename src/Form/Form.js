
import React, { useState } from 'react';

export const Form = () => {
   
   const [ userName, setUserName ] = useState("");
   const [ userAge, setUserAge ] = useState("");
   const [ userFavFood, setUserFavFood ]= useState("");

   return(
      <form>
         <label for="userName">Name:</label>
         <input 
            type="text" 
            id="userName" 
            name="userName"
            value={userName}
            onChange={event => setUserName(event.target.value)}  />

         <label for="userAge">Age:</label>
         <input 
            type="number" 
            id="userAge" 
            name="userAge"
            value={userAge}
            onChange={event => parseInt(setUserAge(event.target.value))}  />

         <label for="userFavFood">Favourite Food:</label>
         <input 
            type="text" 
            id="userFavFood" 
            name="userFavFood"
            value={userFavFood}
            onChange={event => setUserFavFood(event.target.value)}
              />
      </form>
   )
}

export const FormOutput = ({userName, userAge, userFavFood}) => {
   return(
      <h2>hi</h2>
   )
}

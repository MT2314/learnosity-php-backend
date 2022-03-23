import React from 'react';

const FormOutput = ({ inputs }) => {
   
   const { userName = "", userAge = "", userFavFood = ""} = inputs;

   return(
      <div>
         User Info:
         <p>Name: {userName} </p>
         <p>Age: {userAge} </p>
         <p>userFavFood: {userFavFood} </p>
      </div>
   )
}

export default FormOutput;
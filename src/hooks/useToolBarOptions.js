// useToolBarOptions allows you to set the toolbar options for formatted text in your components. 

//1. import {useTooBarOPtions} from "./[CORRECT_PATH]"
//2. define variable to store new toolbar configuration. 
    //eg. const componentToolBar = useToolBarOptions(options, inlineOptions)
//3. useToolBarOptions take 2 arrays as arguments. 
    //a. options is the tools you would like on formatted text in an array
         //It may include: ["inline", "textAlign", "list", "link"]
    //b. inline options is available if you choose "inline"
      //it is a second array that may include [ "bold","italic","underline","strikethrough","superscript","subscript"],

export const useToolBarOptions = (options, inlineOptions) => {
  return {
  options: options,
  inline: {
    options: inlineOptions,
  },
  textAlign: {
    options: ["left", "center", "right", "justify"],
  },
  link: {
    options: ["link", "unlink"],
    link: { className: "bordered-option-classname" },
    unlink: { className: "bordered-option-classname" },
  },
};

}
const parseData = require("./parse-props");
const quillConverter = require("./quillConverter");
const headingsConverter = require("./headingsConverter");

// Array to hold all the lessons
const lessons = [];

const dataConversionFunction = (data) => {
  // Parsing the original data object to convert parts of it that we received as strings into JSON format
  parseData.transformComponentPropsRecursive(data);

  //   Looping over each lesson and convering the raw quill data and headings
  for (let i = 0; i < data.children[0].children.length; i++) {
    // Storing a lesson in a variable on each iteration for easy access/manipulation
    let lesson = data.children[0].children[i];
    // Converting the raw quill data into a html format
    lesson = quillConverter.parse(lesson);
    // Converting any headings found
    lesson = headingsConverter.parse(lesson);
    // Finally pushing each lesson into an array on each iteration
    lessons.push(lesson);
  }
};

module.exports = {
  dataConversionFunction: dataConversionFunction,
  lessons: lessons,
};

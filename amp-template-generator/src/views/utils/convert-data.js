const parseData = require("./parse-props");
const quillConverter = require("./quill-converter");
const headingsConverter = require("./headings-converter");

// Array to hold all the lessons
const lessons = [];

const dataConversionFunction = (data) => {
  // Parsing the original data object to convert parts of it that we received as strings into JSON format
  parseData.transformComponentPropsRecursive(data);

  // Looping over each lesson and convering the raw quill data and headings
  for (let lessonIndex = 0; lessonIndex < data.length; lessonIndex++) {
    // Storing a lesson in a variable on each iteration for easy access/manipulation
    const lesson = data[lessonIndex];
    const twoDigits = lesson.indexInParent < 9 ? "0" : "";
    const lessonPath = [
      ...lesson.path.map(
        (container) =>
          `${container.type.substring(0, 1).toUpperCase()}${
            container.indexInParent < 9 ? "0" : ""
          }${container.indexInParent + 1}`
      ),
      `L${twoDigits}${lesson.indexInParent + 1}`,
    ].join("_");
    lessons.push(
      // Converting any headings found
      // Converting the raw quill data into a html format
      // Finally pushing each lesson into an array on each iteration
      headingsConverter.parse(quillConverter.parse({ ...lesson, lessonPath }))
    );
  }
};

module.exports = {
  dataConversionFunction,
  lessons,
};

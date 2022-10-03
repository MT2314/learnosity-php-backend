const parseData = require("./parse-props");
const quillConverter = require("./quill-converter");
const headingsConverter = require("./headings-converter");

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

const dataConversionFlatArray = (data) => {
  parseData.transformComponentPropsRecursive(data);
  for (let lessonIndex = 0; lessonIndex < data.length; lessonIndex++) {
    const lesson = data[lessonIndex];
    const twoDigits = lesson.indexInParent < 9 ? "0" : "";
    const lessonPath = [
      ...lesson.path.map(
        (container) =>
          `${container.type.substring(0, 1)}${container.indexInParent + 1}`
      ),
      `la${twoDigits}${lesson.indexInParent + 1}`,
    ].join("_");
    lessons.push(
      headingsConverter.parse(quillConverter.parse({ ...lesson, lessonPath }))
    );
  }
};

module.exports = {
  dataConversionFunction: dataConversionFunction,
  lessons: lessons,
  dataConversionFlatArray,
};

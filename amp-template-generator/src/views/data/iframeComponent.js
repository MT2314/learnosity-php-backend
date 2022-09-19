const headings = require("../utils/headings");
const quillConverter = require("../utils/quillConverter");

/**
 * Returns an array of lessons, based on the Node ID. Even if you are
 * requesting a singular lesson, it will be returned as an array of one
 * lesson. If an error is encountered, an empty Array will be returned.
 *
 * @returns {Array}
 */
module.exports = async function () {
  var lessons = [];

  const data = {
    __typename: "Course",
    id: "6318a3c78f3a72b1dc77a9ee",
    name: "AMP Testing",
    courseCode: null,
    language: null,
    children: [
      {
        __typename: "CourseStructureContainer",
        id: "6318a3c78f3a72b1dc77a9ef",
        name: "",
        type: "unit",
        componentContainers: [],
        children: [
          {
            __typename: "CourseStructureContainer",
            id: "6318a3c78f3a72b1dc77a9f0",
            name: "Iframe Component",
            type: "lesson",
            componentContainers: [
              {
                __typename: "ComponentContainer",
                id: "6318a3c78f3a72b1dc77a9f1",
                sections: [
                  {
                    id: "6318a3c78f3a72b1dc77a9f2",
                    type: "NONLEARNING",
                    components: [
                      {
                        componentName: "Text",
                        props: '{"text":"default text"}',
                        position: "b",
                      },
                    ],
                  },
                  {
                    id: "6318a3c78f3a72b1dc77a9f4",
                    type: "LEARNING",
                    components: [
                      {
                        componentName: "IFrame",
                        props:
                          '{"title":"Pretend iFrame Title","titleDisplay":true,"src":"https://dcc.ilc.org/bbi2o/10/income_statement_1/index.html","height":"500","width":"900","heightType":"px","widthType":"px"}',
                        position: "u",
                      },
                    ],
                  },
                ],
              },
            ],
            children: [],
          },
        ],
      },
    ],
  };

  // Move this function out into a new file?
  if (data?.__typename === "Course") {
    const transformComponentPropsRecusive = (container) => {
      if (container.children) {
        for (let index = 0; index < container.children.length; index++) {
          const child = container.children[index];
          transformComponentPropsRecusive(child);
        }
      }

      if (container.componentContainers) {
        for (
          let ccIndex = 0;
          ccIndex < container.componentContainers.length;
          ccIndex++
        ) {
          const componentContainer = container.componentContainers[ccIndex];
          componentContainer.sections = componentContainer.sections.sort(
            (a, b) => (a.position < b.position ? -1 : 1)
          );
          for (
            let sectionIndex = 0;
            sectionIndex < componentContainer.sections.length;
            sectionIndex++
          ) {
            const section = componentContainer.sections[sectionIndex];
            section.components = section.components.sort((a, b) =>
              a.position < b.position ? -1 : 1
            );
            for (
              let componentIndex = 0;
              componentIndex < section.components.length;
              componentIndex++
            ) {
              const component = section.components[componentIndex];
              try {
                component.props = JSON.parse(component.props);
              } catch (err) {
                console.error(err);
              }
            }
          }
        }
      }
    };

    transformComponentPropsRecusive(data);

    // console.log(JSON.stringify(data, null, 4));

    // Looping through each lesson and running the converter functions on them
    // Once the conversion has taken place, the lesson will be pushed into the "lessons" array
    for (let i = 0; i < data.children[0].children.length; i++) {
      let lesson = data.children[0].children[i];

      lesson = quillConverter.parse(lesson);

      lesson = headings.parse(lesson);

      lessons.push(lesson);
    }

    // console.log(JSON.stringify(data, null, 4));
  } else {
    // TODO: may need to check for type if __typename does not exist eg. getLesson
  }
  return lessons;
};

const convertData = require("../utils/convert-data");

module.exports = async function () {
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
            name: "Text Component",
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
                        componentName: "Text",
                        props:
                          '{"body":{"ops":[{"insert":"Think about what a bear would need to be healthy in their environment and draw some examples.\\n\\nHint: Think about what the bear needs.\\n\\nComplete the "},{"attributes":{"bold":true},"insert":"Bear Environment Activity"},{"insert":" in your notebook or using the following fillable and printable document. If you would like, you can use speech-to-text or audio recording tools to record your thoughts.\\n"}]}}',
                        position: "U",
                      },
                      {
                        componentName: "Text",
                        props:
                          '{"body":{"ops":[{"insert":"Sharing our learning\\n\\nHow can you share your learning about how environments help animals and people meet their needs?\\n\\nWhat is the best way for you to show someone else this important information?\\nDo you enjoy sharing using pictures?"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Do you enjoy written words?"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Do you enjoy sharing using spoken words?"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Could you make a video?"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"\\n"}]}}',
                        position: "g",
                      },
                      {
                        componentName: "Text",
                        props:
                          '{"body":{"ops":[{"insert":"Reflection\\n\\nHow do you feel about what you have learned in this activity? Which of the next four sentences best matches how you are feeling about your learning? Press the button that is beside this sentence.\\n"}]}}',
                        position: "p",
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

  if (data?.__typename === "Course") {
    convertData.dataConversionFunction(data);
  } else {
    // TODO: may need to check for type if __typename does not exist eg. getLesson
  }
  return convertData.lessons;
};

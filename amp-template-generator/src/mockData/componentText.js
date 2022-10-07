const convertData = require("../utils/convert-data");

module.exports = async function () {
  const data = [
    {
      __typename: "LessonStructureContainer",
      id: "633aebff203363a7d97f7354",
      type: "lesson",
      name: "Text Component",
      description: null,
      indexInParent: 0,
      componentContainer: {
        __typename: "ComponentContainer",
        id: "633aebff203363a7d97f7355",
        lastUpdateID: "46430",
        title: "Component",
        sections: [
          {
            __typename: "Section",
            id: "633aebff203363a7d97f7356",
            type: "NONLEARNING",
            locked: true,
            components: [
              {
                id: "633aebff203363a7d97f7357",
                componentName: "Text",
                props: '{"text":"default text"}',
                locked: true,
              },
            ],
          },
          {
            __typename: "Section",
            id: "633aebff203363a7d97f7358",
            type: "LEARNING",
            locked: false,
            components: [
              {
                componentName: "Text",
                props:
                  '{"body":{"ops":[{"insert":"Think about what a bear would need to be healthy in their environment and draw some examples.\\n\\nHint: Think about what the bear needs.\\n\\nComplete the "},{"attributes":{"bold":true},"insert":"Bear Environment Activity"},{"insert":" in your notebook or using the following fillable and printable document. If you would like, you can use speech-to-text or audio recording tools to record your thoughts.\\n"}]}}',
                locked: false,
              },
              {
                componentName: "Text",
                props:
                  '{"body":{"ops":[{"insert":"Sharing our learning\\n\\nHow can you share your learning about how environments help animals and people meet their needs?\\n\\nWhat is the best way for you to show someone else this important information?\\nDo you enjoy sharing using pictures?"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Do you enjoy written words?"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Do you enjoy sharing using spoken words?"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Could you make a video?"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"\\n"}]}}',
                locked: false,
              },
              {
                componentName: "Text",
                props:
                  '{"body":{"ops":[{"insert":"Reflection\\n\\nHow do you feel about what you have learned in this activity? Which of the next four sentences best matches how you are feeling about your learning? Press the button that is beside this sentence.\\n"}]}}',
                locked: false,
              },
            ],
          },
        ],
        parentCourseID: "633aebff203363a7d97f7352",
        createdAt: "1664805887360",
        updatedAt: "1664811470175",
      },
      path: [
        {
          id: "633aebff203363a7d97f7353",
          type: "unit",
          name: "AMP Components",
          indexInParent: 0,
        },
      ],
      index: 1,
    },
  ];

  if (
    // If the returns is an array of LessonStructureContainers (getLessons)
    Array.isArray(data) &&
    data[0]?.__typename === "LessonStructureContainer"
  ) {
    convertData.dataConversionFunction(data);
  } else {
    // TODO: may need to check for type if __typename does not exist eg. getLesson
  }
  return convertData.lessons;
};

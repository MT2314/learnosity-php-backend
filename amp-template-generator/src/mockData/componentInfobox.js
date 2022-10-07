const convertData = require("../utils/convert-data");

module.exports = async function () {
  const data = [
    {
      __typename: "LessonStructureContainer",
      id: "633aebff203363a7d97f7354",
      type: "lesson",
      name: "Infobox Component",
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
                componentName: "InfoBox",
                props:
                  '{"infoBoxState":{"infoBoxIcon":"Definition","infoBoxLabel":"This is a label for InfoBox","infoBoxHeader":{"heading":"This is an InfoBox header","headingLevel":"3"},"body":{"ops":[{"insert":"This is a sentence with "},{"attributes":{"bold":true},"insert":"bold text"},{"insert":".\\nThis is a sentence with "},{"attributes":{"underline":true},"insert":"underlined text"},{"insert":".\\nThis is a sentence with "},{"attributes":{"italic":true},"insert":"italicized text"},{"insert":".\\n"},{"attributes":{"italic":true,"bold":true},"insert":"And this"},{"insert":" "},{"attributes":{"underline":true,"italic":true},"insert":"sentence has a"},{"insert":" "},{"attributes":{"underline":true,"bold":true},"insert":"combination of"},{"insert":" "},{"attributes":{"underline":true,"italic":true,"bold":true},"insert":"all three formats"},{"insert":".\\n"}]}}}',
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

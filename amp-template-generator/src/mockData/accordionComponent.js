const convertData = require("../utils/convert-data");

module.exports = async function () {
  const data = [
    {
      __typename: "LessonStructureContainer",
      id: "633aebff203363a7d97f7354",
      type: "lesson",
      name: "Accordion Component",
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
                id: "633aedea203363a7d97f75b9",
                componentName: "Accordion",
                props:
                  '{"layoutState":[{"id":"5cec2119-1c74-4118-b467-a9a4a94ff4fa","title":"Pane 1","placeholderTitle":"Pane 1","components":[{"componentName":"Text","componentProps":{"body":{"ops":[{"insert":"Accordion 1 text\\n"}]}}}],"expanded":false},{"id":"5cec2119-1c74-4118-b467-a9a4a94ff4fb","title":"Pane 2","placeholderTitle":"Pane 1","components":[{"componentName":"Text","componentProps":{"body":{"ops":[{"insert":"Accordion 2 text 1\\n"}]}}},{"componentName":"Text","componentProps":{"body":{"ops":[{"insert":"Accordion 2 text 2\\n"}]}}}],"expanded":false},{"id":"5cec2119-1c74-4118-b467-a9a4a94ff4fc","title":"Pane 3","placeholderTitle":"Pane 1","components":[],"expanded":false}]}',
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

  if (data?.__typename === "Course") {
    convertData.dataConversionFunction(data);
  } else if (
    // If the returns is an array of LessonStructureContainers (getLessons)
    Array.isArray(data) &&
    data[0]?.__typename === "LessonStructureContainer"
  ) {
    convertData.dataConversionFlatArray(data);
  } else {
    // TODO: may need to check for type if __typename does not exist eg. getLesson
  }
  return convertData.lessons;
};

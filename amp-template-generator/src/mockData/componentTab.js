const convertData = require("../utils/convert-data");

module.exports = async function () {
  const data = [
    {
      __typename: "LessonStructureContainer",
      id: "633aebff203363a7d97f7354",
      type: "lesson",
      name: "Tabs Component",
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
                componentName: "Tab",
                props:
                  '{"layoutState":[{"type":"TAB","id":"83c9445c-23d9-4ee9-8298-cf9f594f4c66","title":"Image","components":[]},{"type":"TAB","id":"d59a4b07-0466-4164-8ac3-7e7404b2f3d0","title":"Video","components":[{"componentName":"Video","componentProps":{"credit":{"blocks":[{"key":"fu9qm","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}}},{"componentName":"Video","componentProps":{"type":"youTube","videoId":"3m6d99GDARE","caption":null,"credit":null,"transcript":null}},{"componentName":"Video","componentProps":{"type":"brightcove","videoId":"5967111782001","caption":null,"credit":null,"transcript":{"blocks":[{"key":"7m3m2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}}}]},{"id":"0e0e5cd2-3b4c-47fa-965f-7a06642b0321","title":"Text","placeholderTitle":"Tab 3","components":[{"componentName":"Text","componentProps":{"body":{"ops":[{"insert":"This is "},{"attributes":{"bold":true},"insert":"BOLD"},{"insert":"\\n"}]}}}]}]}',
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

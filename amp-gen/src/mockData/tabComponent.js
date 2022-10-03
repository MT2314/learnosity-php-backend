const convertData = require("../utils/convertData");

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
            name: "Tab Component",
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
                        componentName: "Tab",
                        props:
                          '{"layoutState":[{"type":"TAB","id":"83c9445c-23d9-4ee9-8298-cf9f594f4c66","title":"Image","components":[]},{"type":"TAB","id":"d59a4b07-0466-4164-8ac3-7e7404b2f3d0","title":"Video","components":[{"componentName":"Video","componentProps":{"credit":{"blocks":[{"key":"fu9qm","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}}},{"componentName":"Video","componentProps":{"type":"youTube","videoId":"3m6d99GDARE","caption":null,"credit":null,"transcript":null}},{"componentName":"Video","componentProps":{"type":"brightcove","videoId":"5967111782001","caption":null,"credit":null,"transcript":{"blocks":[{"key":"7m3m2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}}}]},{"id":"0e0e5cd2-3b4c-47fa-965f-7a06642b0321","title":"Text","placeholderTitle":"Tab 3","components":[{"componentName":"Text","componentProps":{"body":{"ops":[{"insert":"This is "},{"attributes":{"bold":true},"insert":"BOLD"},{"insert":"\\n"}]}}}]}]}',
                        position: "x",
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

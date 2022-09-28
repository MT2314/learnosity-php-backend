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
            name: "Infobox Component",
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
                        componentName: "InfoBox",
                        props:
                          '{"infoBoxState":{"infoBoxIcon":"Definition","infoBoxLabel":"This is a label for InfoBox","infoBoxHeader":{"heading":"This is an InfoBox header","headingLevel":"3"},"body":{"ops":[{"insert":"This is a sentence with "},{"attributes":{"bold":true},"insert":"bold text"},{"insert":".\\nThis is a sentence with "},{"attributes":{"underline":true},"insert":"underlined text"},{"insert":".\\nThis is a sentence with "},{"attributes":{"italic":true},"insert":"italicized text"},{"insert":".\\n"},{"attributes":{"italic":true,"bold":true},"insert":"And this"},{"insert":" "},{"attributes":{"underline":true,"italic":true},"insert":"sentence has a"},{"insert":" "},{"attributes":{"underline":true,"bold":true},"insert":"combination of"},{"insert":" "},{"attributes":{"underline":true,"italic":true,"bold":true},"insert":"all three formats"},{"insert":".\\n"}]}}}',
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

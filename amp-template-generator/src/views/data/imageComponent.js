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
            name: "Image Component",
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
                        componentName: "Image",
                        props:
                          '{"imgSize":"default","uploadedImg":"https://cdn.shopify.com/s/files/1/0023/1794/2820/files/Polkaroo_large.PNG?v=1556241987","imgLink":"https://www.tvo.org","alt":"Polkaroo standing with crossed arms","longDesc":"","caption":"I am a caption","credit":null}',
                        position: "g",
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

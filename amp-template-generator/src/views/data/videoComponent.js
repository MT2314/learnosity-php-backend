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
            name: "Video Component",
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
                        componentName: "Video",
                        props: {
                          type: "youTube",
                          videoId: "3m6d99GDARE",
                          caption: null,
                          credit: null,
                          transcript: null,
                          body: "<p><br></p>",
                        },
                      },
                      {
                        componentName: "Video",
                        props: {
                          type: "youTube",
                          videoId: "iCABig-a3PE",
                          caption: null,
                          credit: null,
                          transcript: null,
                          body: "<p><br></p>",
                        },
                      },
                      {
                        componentName: "Video",
                        props: {
                          type: "youTube",
                          videoId: "wieKORf0dH4",
                          caption: null,
                          credit: null,
                          transcript: null,
                          body: "<p><br></p>",
                        },
                      },
                      {
                        componentName: "Video",
                        props: {
                          type: "brightcove",
                          videoId: "5967111782001",
                          caption: null,
                          credit: null,
                          transcript: {
                            blocks: [
                              {
                                key: "7m3m2",
                                text: "",
                                type: "unstyled",
                                depth: 0,
                                inlineStyleRanges: [],
                                entityRanges: [],
                                data: {},
                              },
                            ],
                            entityMap: {},
                          },
                          body: "<p><br></p>",
                        },
                      },
                      {
                        componentName: "Video",
                        props: {
                          type: "brightcove",
                          videoId: "5967111782001",
                          caption: null,
                          credit: null,
                          transcript: {
                            blocks: [
                              {
                                key: "7m3m2",
                                text: "",
                                type: "unstyled",
                                depth: 0,
                                inlineStyleRanges: [],
                                entityRanges: [],
                                data: {},
                              },
                            ],
                            entityMap: {},
                          },
                          body: "<p><br></p>",
                        },
                      },
                      {
                        componentName: "Video",
                        props: {
                          type: "brightcove",
                          videoId: "5967111782001",
                          caption: null,
                          credit: null,
                          transcript: {
                            blocks: [
                              {
                                key: "7m3m2",
                                text: "",
                                type: "unstyled",
                                depth: 0,
                                inlineStyleRanges: [],
                                entityRanges: [],
                                data: {},
                              },
                            ],
                            entityMap: {},
                          },
                          body: "<p><br></p>",
                        },
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

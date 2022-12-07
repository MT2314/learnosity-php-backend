const convertData = require("../utils/convert-data");

module.exports = async function () {
  const data = [
    {
      __typename: "LessonStructureContainer",
      id: "633aebff203363a7d97f7354",
      type: "lesson",
      name: "Video Component",
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
                id: "6373ae1eb60270b3cb86bcc4",
                componentName: "Video",
                props:
                {
                  videoState: {
                    id: '25b38f1d-56ea-4b44-a278-59612902df60',
                    videoSource: 'brightcove',
                    videoURL: 'https://edge.api.brightcove.com/playback/v1/accounts/23648095001/videos/5967111782001',
                    videoDescription: "Hi",
                    videoCredit: null,
                    videoId: '5967111782001',
                    videoTranscript: null,
                    videoTextSettings: { description: true, credit: true }
                  }
                },
                locked: false,
              },
              {
                id: "6373ae1eb60270b3cb86bcc4",
                componentName: "Video",
                props:
                {
                  videoState: {
                    id: '25b38f1d-56ea-4b44-a278-59612902df60',
                    videoSource: 'brightcove',
                    videoURL: 'https://edge.api.brightcove.com/playback/v1/accounts/23648095001/videos/5967111782001',
                    videoDescription: "Hi",
                    videoCredit: null,
                    videoId: '5967111782001',
                    videoTranscript: null,
                    videoTextSettings: { description: true, credit: true }
                  }
                },
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

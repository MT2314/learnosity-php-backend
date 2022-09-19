const index = require("../utils/index");
const headings = require("../utils/headings");
const quillConverter = require("../utils/quillConverter");

/**
 * Returns an array of lessons, based on the Node ID. Even if you are
 * requesting a singular lesson, it will be returned as an array of one
 * lesson. If an error is encountered, an empty Array will be returned.
 *
 * @returns {Array}
 */
module.exports = async function () {
  var lessons = [];

  const data = {
    __typename: "Course",
    id: "631b4a1cca8eeadaf4ee7406",
    name: "Component AMP Test Course",
    courseCode: "SAM123",
    language: null,
    children: [
      {
        __typename: "CourseStructureContainer",
        id: "631b4a1cca8eeadaf4ee7407",
        name: "Fake Unit",
        type: "unit",
        componentContainers: [],
        children: [
          {
            __typename: "CourseStructureContainer",
            id: "631b4a1cca8eeadaf4ee7408",
            name: "test lesson",
            type: "lesson",
            componentContainers: [
              {
                __typename: "ComponentContainer",
                id: "631b4a1cca8eeadaf4ee7409",
                sections: [
                  {
                    id: "631b4a1cca8eeadaf4ee740a",
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
                    id: "631b4a1cca8eeadaf4ee740c",
                    type: "LEARNING",
                    components: [
                      {
                        componentName: "Text",
                        props:
                          '{"body":{"ops":[{"insert":"This is a sentence with "},{"attributes":{"bold":true},"insert":"bold text"},{"insert":".\\nThis is a sentence with "},{"attributes":{"underline":true},"insert":"underlined text"},{"insert":".\\nThis is a sentence with "},{"attributes":{"italic":true},"insert":"italicized text"},{"insert":".\\n"},{"attributes":{"italic":true,"bold":true},"insert":"And this"},{"insert":" "},{"attributes":{"underline":true,"italic":true},"insert":"sentence has a"},{"insert":" "},{"attributes":{"underline":true,"bold":true},"insert":"combination of"},{"insert":" "},{"attributes":{"underline":true,"italic":true,"bold":true},"insert":"all three formats"},{"insert":".\\n"}]}}',
                        position: "U",
                      },
                      {
                        componentName: "Image",
                        props:
                          '{"imgSize":"default","uploadedImg":"https://cdn.shopify.com/s/files/1/0023/1794/2820/files/Polkaroo_large.PNG?v=1556241987","imgLink":"https://www.tvo.org","alt":"Polkaroo standing with crossed arms","longDesc":"","caption":"I am a caption","credit":null}',
                        position: "g",
                      },
                      {
                        componentName: "InfoBox",
                        props:
                          '{"infoBoxIcon":null,"infoBoxLabel":"","infoBoxHeader":"","body":null,"infoBoxBody":null,"infoBoxState":{"infoBoxIcon":null,"infoBoxLabel":"This is a label for InfoBox","infoBoxHeader":{"heading":"This is an InfoBox header","headingLevel":"3"},"body":{"ops":[{"insert":"This is a sentence with "},{"attributes":{"bold":true},"insert":"bold text"},{"insert":".\\nThis is a sentence with "},{"attributes":{"underline":true},"insert":"underlined text"},{"insert":".\\nThis is a sentence with "},{"attributes":{"italic":true},"insert":"italicized text"},{"insert":".\\n"},{"attributes":{"italic":true,"bold":true},"insert":"And this"},{"insert":" "},{"attributes":{"underline":true,"italic":true},"insert":"sentence has a"},{"insert":" "},{"attributes":{"underline":true,"bold":true},"insert":"combination of"},{"insert":" "},{"attributes":{"underline":true,"italic":true,"bold":true},"insert":"all three formats"},{"insert":".\\n"}]}}}',
                        position: "p",
                      },
                      {
                        componentName: "IFrame",
                        props:
                          '{"title":"Pretend iFrame Title","titleDisplay":true,"src":"https://dcc.ilc.org/bbi2o/10/income_statement_1/index.html","height":"500","width":"900","heightType":"px","widthType":"px"}',
                        position: "u",
                      },
                      {
                        componentName: "Video",
                        props:
                          '{"type":"youTube", "videoId": "3m6d99GDARE", "caption":"I am a caption", "credit": null, "transcript": null}',
                        position: "w",
                      },
                      {
                        componentName: "Tab",
                        props:
                          '{"layoutState":[{"type":"TAB","id":"83c9445c-23d9-4ee9-8298-cf9f594f4c66","title":"Image","components":[]},{"type":"TAB","id":"d59a4b07-0466-4164-8ac3-7e7404b2f3d0","title":"Video","components":[{"componentName":"Video","componentProps":{"credit":{"blocks":[{"key":"fu9qm","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}}},{"componentName":"Video","componentProps":{"type":"youTube","videoId":"3m6d99GDARE","caption":null,"credit":null,"transcript":null}},{"componentName":"Video","componentProps":{"type":"brightcove","videoId":"5967111782001","caption":null,"credit":null,"transcript":{"blocks":[{"key":"7m3m2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}}}]},{"id":"0e0e5cd2-3b4c-47fa-965f-7a06642b0321","title":"Text","placeholderTitle":"Tab 3","components":[{"componentName":"Text","componentProps":{"body":{"ops":[{"insert":"This is "},{"attributes":{"bold":true},"insert":"BOLD"},{"insert":"\\n"}]}}}]}]}',
                        position: "x",
                      },
                      {
                        componentName: "Video",
                        props:
                          '{"type":"brightcove","videoId":"5967111782001","caption":"I am a caption","credit":null,"transcript":{"blocks":[{"key":"7m3m2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}}',
                        position: "wU",
                      },
                      {
                        componentName: "Accordion",
                        props:
                          '{"layoutState":[{"id":"c44d0ec8-970f-43b5-ae88-6d05f3636a8c","title":"Panel 1","placeholderTitle":"Pane 1","components":[],"expanded":true},{"id":"0f282742-3bd1-4708-bbaa-451fde142e96","title":"Panel 2","placeholderTitle":"Pane 2","components":[],"expanded":true}]}',
                        position: "y",
                      },
                      {
                        componentName: "Text",
                        props: '{"body":null}',
                        position: "xU",
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

  // Move this function out into a new file?
  if (data?.__typename === "Course") {
    const transformComponentPropsRecusive = (container) => {
      if (container.children) {
        for (let index = 0; index < container.children.length; index++) {
          const child = container.children[index];
          transformComponentPropsRecusive(child);
        }
      }

      if (container.componentContainers) {
        for (
          let ccIndex = 0;
          ccIndex < container.componentContainers.length;
          ccIndex++
        ) {
          const componentContainer = container.componentContainers[ccIndex];
          componentContainer.sections = componentContainer.sections.sort(
            (a, b) => (a.position < b.position ? -1 : 1)
          );
          for (
            let sectionIndex = 0;
            sectionIndex < componentContainer.sections.length;
            sectionIndex++
          ) {
            const section = componentContainer.sections[sectionIndex];
            section.components = section.components.sort((a, b) =>
              a.position < b.position ? -1 : 1
            );
            for (
              let componentIndex = 0;
              componentIndex < section.components.length;
              componentIndex++
            ) {
              const component = section.components[componentIndex];
              try {
                component.props = JSON.parse(component.props);
              } catch (err) {
                console.error(err);
              }
            }
          }
        }
      }
    };

    transformComponentPropsRecusive(data);

    // console.log(JSON.stringify(data, null, 4));

    // Looping through each lesson and running the converter functions on them
    // Once the conversion has taken place, the lesson will be pushed into the "lessons" array
    for (let i = 0; i < data.children[0].children.length; i++) {
      let lesson = data.children[0].children[i];

      lesson = quillConverter.parse(lesson);

      lesson = headings.parse(lesson);

      lessons.push(lesson);
    }

    // console.log(JSON.stringify(data, null, 4));
  } else {
    // TODO: may need to check for type if __typename does not exist eg. getLesson
  }
  return lessons;
};

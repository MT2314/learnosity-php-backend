const convertData = require("../utils/convert-data");

module.exports = async function () {
    const data = [
        {
          __typename: "LessonStructureContainer",
          id: "633aebff203363a7d97f7354",
          type: "lesson",
          name: "Table Component",
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
                    componentName: "Table",
                    props: '{"caption":"This table features headers on top and left, with the left pane frozen on scroll.", "rows": [ { "columns": [ { "type": "string", "field": "Type of polynomial" }, { "type": "string", "field": "Number of terms" }, { "type": "string", "field": "Examples" }, { "type": "string", "field": "Some" }, { "type": "string", "field": "extra" }, { "type": "string", "field": "content" }, { "type": "string", "field": "for" }, { "type": "string", "field": "testing" } ] }, { "columns": [ { "type": "string", "field": "Constant next word" }, { "type": "string", "field": "1 (no variable)" }, { "type": "string", "field": "Math" }, { "type": "string", "field": "Some extra content" }, { "type": "string", "field": "to make the table" }, { "type": "string", "field": "wider." }, { "type": "string", "field": "Should be interesting" }, { "type": "string", "field": "dontcha think?" } ] }, { "columns": [ { "type": "string", "field": "Monomial" }, { "type": "string", "field": "1" }, { "type": "string", "field": "Math" }, { "type": "string", "field": "Some extra content" }, { "type": "string", "field": "to make the table" }, { "type": "string", "field": "wider." }, { "type": "string", "field": "Should be interesting" }, { "type": "string", "field": "dontcha think?" } ] }, { "columns": [ { "type": "string", "field": "BinomialBinomial" }, { "type": "string", "field": "2" }, { "type": "string", "field": "p tag" }, { "type": "string", "field": "Some extra content" }, { "type": "string", "field": "to make the table" }, { "type": "string", "field": "wider." }, { "type": "string", "field": "Should be interesting" }, { "type": "string", "field": "dontcha think?" } ] }, { "columns": [ { "type": "string", "field": "Trinomial" }, { "type": "string", "field": "3" }, { "type": "string", "field": "Math" }, { "type": "string", "field": "Some extra content" }, { "type": "string", "field": "to make the table" }, { "type": "string", "field": "wider." }, { "type": "string", "field": "Should be interesting" }, { "type": "string", "field": "dontcha think?" } ] } ]}',
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

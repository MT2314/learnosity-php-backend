// const { convertDeltaToHtml } = require("node-quill-converter-improved");
const {
  convertDeltaToHtml,
} = require("../../utils/node-quill-converter-improved");

function parse(entity) {
  /**
   * Internal callback to recursively call self at the next level. Called by
   * forEach loops.
   *
   * @private
   * @param {Object} element
   * @returns {Object}
   * @throws {Error}
   */
  function __parseElement(element) {
    return (element = parse(element));
  }

  // I am passing over the course
  // I have access to componentContainers
  // Inside componentContainers there is sections
  // Sections hold non-learning and learning sections
  // Within the sections are the components
  // Inside of the components array is the { componentName: 'Text', props: { body: { ops: [Array] } } }
  // I need access to props.body to be able to convert it to a html element

  // switch (entity.__typename) {
  //     case 'CourseStructureContainer':
  //         entity.componentContainers.forEach(__parseElement);
  //         break;
  //     case 'ComponentContainer':
  //         entity.sections.forEach(__parseElement);
  //         break;
  //     case 'NONLEARNING':
  //     case 'LEARNING':
  //         entity.components.forEach(__parseElement);
  //         break;
  //     case 'Text':
  //         entity.props.body = _setHtml(entity.props.body);
  //         break;
  //     case 'InfoBox':
  //         entity.props.infoBoxState.body = _setHtml(entity.props.infoBoxState.body);
  //         break;
  //     case 'Tab':
  //     case 'Accordion':
  //        Running a for loop through the first array we hit, which is the layoutState
  //          for (let i = 0; i < entity.props.layoutState.length; i++) {
  //          Running another for loop to then iterate through the components in the tab and convert anything with componentProps.body
  //            for (let j = 0; j < entity.props.layoutState[i].components.length; j++) {
  //                entity.props.layoutState[i].components[j].componentProps.body =
  //                _setHtml(
  //                entity.props.layoutState[i].components[j].componentProps.body
  //              );
  //            }
  //          }
  //         break;

  // ToDo: future components

  //     default:
  // nothing to do here, because anything else doesn't have a fancy heading.
  // }

  // set html levels of entities that are "underneath" this one
  if (entity.__typename === "CourseStructureContainer") {
    entity.componentContainers.forEach(__parseElement);
  } else if (entity.__typename === "LessonStructureContainer") {
    __parseElement(entity.componentContainer);
  } else if (entity.__typename === "ComponentContainer") {
    entity.sections.forEach(__parseElement);
  } else if (entity.__typename === "Section") {
    entity.components.forEach(__parseElement);
  } else if (entity.componentName === "Text") {
    entity.props.body = _setHtml(entity.props.body);
  } else if (
    entity.componentName === "Tab" ||
    entity.componentName === "Accordion"
  ) {
    // Running a for loop through the first array we hit, which is the layoutState
    for (let i = 0; i < entity.props.layoutState.length; i++) {
      // Running another for loop to then iterate through the components in the tab and convert anything with componentProps.body
      for (let j = 0; j < entity.props.layoutState[i].components.length; j++) {
        entity.props.layoutState[i].components[j].componentProps.body =
          _setHtml(
            entity.props.layoutState[i].components[j].componentProps.body
          );
      }
    }
  } else if (entity.componentName === "InfoBox") {
    entity.props.infoBoxState.body = _setHtml(entity.props.infoBoxState.body);
  }

  return entity;
}

// Converts the quill data into a html element
function _setHtml(quill) {
  // Converting and storing the quill data for easy access
  let converted = convertDeltaToHtml(quill);

  // Adding sr-only text to links after quill conversion
  converted = converted.replace(
    /<\/a>/g,
    // "<span class='sr-only'>(Opens in a new window)</span></a>"
    "<span><i class='anchor-icon'>&#xe802;</i></span><span class='sr-only'>(Opens in a new window)</span></a>"
    // Used if svg is set as element
    // "<span class='sr-only'>(Opens in a new window)</span><svg class='anchor-img' width='12' height='12' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M13 5.00001L13 1.00001M13 1.00001H8.99999M13 1.00001L7 7M5.66667 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V9.8C1 10.9201 1 11.4802 1.21799 11.908C1.40973 12.2843 1.71569 12.5903 2.09202 12.782C2.51984 13 3.07989 13 4.2 13H9.8C10.9201 13 11.4802 13 11.908 12.782C12.2843 12.5903 12.5903 12.2843 12.782 11.908C13 11.4802 13 10.9201 13 9.8V8.33333' stroke='#292929' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></a>"
    // Used if img is set as element
    // "<span class='sr-only'>(Opens in a new window)</span><img class='anchor-img' src='https://s3-componentsexperiments-sbx01-cac1-01.s3.ca-central-1.amazonaws.com/AMP/Icon.png' alt='Girl in a jacket' width='14' height='14'></a>"
  );

  // Replacing nest <br> tags
  converted = converted.replace(/<p><br><\/p>/g, "<br>");

  return converted;
}

module.exports = {
  parse: parse,
};

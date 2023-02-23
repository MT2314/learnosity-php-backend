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
    entity.componentName === "Accordion" ||
    entity.componentName === "MultiColumn" ||
    entity.componentName === "Reveal"
  ) {
    // Running a for loop through the first array we hit, which is the layoutState
    for (let i = 0; i < entity.props.layoutState.length; i++) {
      // Running another for loop to then iterate through the components in the tab and convert anything with componentProps.body
      for (let j = 0; j < entity.props.layoutState[i].components.length; j++) {
        entity.props.layoutState[i].components[j].componentProps.body =
          _setHtml(
            entity.props.layoutState[i].components[j].componentProps.body
          );
        if (entity.props.layoutState[i].components[j].componentName === "Video") {
          entity.props.layoutState[i].components[j].componentProps.videoState.videoDescription = _setHtml(
            entity.props.layoutState[i].components[j].componentProps.videoState
              .videoDescription
          );
          entity.props.layoutState[i].components[j].componentProps.videoState.videoCredit = _setHtml(
            entity.props.layoutState[i].components[j].componentProps.videoState
              .videoCredit
          );
        } else if (entity.props.layoutState[i].components[j].componentName === "Image") {
            entity.props.layoutState[i].components[j].componentProps.credit = _setHtml(
              entity.props.layoutState[i].components[j].componentProps.credit
            );
          entity.props.layoutState[i].components[j].componentProps.longDesc = _setHtml(
            entity.props.layoutState[i].components[j].componentProps.longDesc
          );
        }
      }
    }
  } else if (entity.componentName === "InfoBox") {
    entity.props.infoBoxState.body = _setHtml(entity.props.infoBoxState.body);
  } else if (entity.componentName === "Video") {
    entity.props.videoState.videoDescription = _setHtml(
      entity.props.videoState.videoDescription
    );
    // Replace line breaks before setting HTML
    noBreakCredit = _replaceLineBreak(entity.props.videoState.videoCredit);
    entity.props.videoState.videoCredit = _setHtml(noBreakCredit);
  } else if (entity.componentName === "Image") {
    entity.props.credit = _setHtml(entity.props.credit);
    entity.props.longDesc = _setHtml(entity.props.longDesc);
  }

  return entity;
}

const _replaceLineBreak = (text) => {
  if (text === "<br>") {
    text.replace("<br>", null);
  }
  return text;
};

// Converts the quill data into a html element
function _setHtml(quill) {
  // Converting and storing the quill data for easy access
  let converted = convertDeltaToHtml(quill);

  // Adding sr-only text to links after quill conversion
  converted = converted.replace(
    /<\/a>/g,
    "<span><i class='anchor-icon'>&#xe802;</i></span><span class='sr-only'>(Opens in a new window)</span></a>"
  );

  // Replacing nest <br> tags
  converted = converted.replace(/<p><br><\/p>/g, "<br>");
  converted = converted.replace(/contenteditable="false"/g, "");

  // Wrapping the contents of li tags with span tags
  converted = converted.replace(/<li>/g, "<li><span>");

  return converted;
}

module.exports = {
  parse: parse,
};

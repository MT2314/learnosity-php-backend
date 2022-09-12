const { convertDeltaToHtml } = require("node-quill-converter-improved");

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

  // set html levels of entities that are "underneath" this one
  if (entity.__typename === "CourseStructureContainer") {
    entity.componentContainers.forEach(__parseElement);
  } else if (entity.__typename === "ComponentContainer") {
    entity.sections.forEach(__parseElement);
  } else if (entity.type === "NONLEARNING" || entity.type === "LEARNING") {
    entity.components.forEach(__parseElement);
  } else if (entity.componentName === "Text") {
    if (entity.props.body) {
      entity.props.body = _setHtml(entity.props.body);
    }
  } else if (entity.componentName === "Tab") {
    for (let i = 0; i < entity.props.layoutState.length; i++) {
      for (let j = 0; j < entity.props.layoutState[i].components.length; j++) {
        entity.props.layoutState[i].components[j].componentProps.body =
          _setHtml(
            entity.props.layoutState[i].components[j].componentProps.body
          );
      }
    }
  }

  return entity;
}

// Converts the quill data into a html element
function _setHtml(quill) {
  return convertDeltaToHtml(quill);
}

module.exports = {
  parse: parse,
};

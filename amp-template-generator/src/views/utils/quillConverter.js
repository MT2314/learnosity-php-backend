const { convertDeltaToHtml } = require("node-quill-converter-improved");
/**
 * Recursively parses an Object's children to set a "heading.headingLevel"
 * property. Returns a new version of the Object. Throws an error if level is
 * ever > 6.
 *
 * @param {Object} entity
 * @param {Integer} level (default 0)
 * @returns {Object}
 * @throws {Error}
 */
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

  // set heading levels of entities that are "underneath" this one
  if (entity.__typename === "CourseStructureContainer") {
    entity.componentContainers.forEach(__parseElement);
  } else if (entity.__typename === "ComponentContainer") {
    entity.sections.forEach(__parseElement);
  } else if (entity.type === "NONLEARNING" || entity.type === "LEARNING") {
    entity.components.forEach(__parseElement);
  } else if (entity.componentName === "Text") {
    entity.props.body = _setHtml(entity.props.body);
  }

  return entity;
}

/**
 * Sets "heading.headingLevel" to level. Throws an error if level > 6.
 *
 * @private
 * @param {Object} heading
 * @param {Integer} level
 * @throws {Error}
 */
function _setHtml(quill) {
  return convertDeltaToHtml(quill);
}

module.exports = {
  parse: parse,
};

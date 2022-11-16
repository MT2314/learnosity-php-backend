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

// lesson level
function parse(entity, level = -1) {
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
    return (element = parse(element, level + 1));
  }

  // set heading levels of entities that are "underneath" this one
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
  //     case 'InfoBox':
  //         entity.props.infoBoxState.infoBoxHeader = _setHeading(
  //         entity.props.infoBoxState.infoBoxHeader,
  //         level
  //       );
  //         break;

  // ToDo:
  //     case 'accordion':
  //         entity.accordionPanes.forEach(item => {
  //             _setHeading(item.heading, level + 1);
  //         });
  //         break;
  //     case 'carousel':
  //         entity.slides.forEach(__parseElement);
  //         break;
  //     case 'tabs':
  //         // parse() each tab
  //         entity.tabs.forEach(tab => {
  //             parse(tab, level - 1);
  //         });
  //         break;

  //     default:
  // nothing to do here, because anything else doesn't have a fancy heading.
  // }

  // const hasHeaderAbove = false;

  // Each lesson starts off with an H1 tag, so we start an array of heading tags containing a 1:
  const arrayOfHeadingTags = [1];

  // From here we want to check each section and assign an h2 to any heading on the following "level"...

  // Any heading one level down from each h2 heading should be generated as an h3 (for example, the headings in an accordion title or tab title)...

  // After that, any heading possibly existing within a tabs or accordion component should theoretically be rendered as an h4 (note: no components can currently be added to either tabs or accordion that involve headings, but just thinking of future-proofing this function...)

  // There likely won't be too many examples of more nested heading tags, but we can likely account for them here anyhow (again, future-proofing...)

  // We also want to re-assign arrayOfHeadingTags to be its initial state of [1] for each new section found on the page, in order to have each section start appropriately with h2 tags...

  const checkHeadingLevel = () => {
    const previousHeading = arrayOfHeadingTags[arrayOfHeadingTags.length - 1];
    console.log(previousHeading);
    arrayOfHeadingTags.push(previousHeading + 1);
    console.log(arrayOfHeadingTags);
    return "h" + (previousHeading + 1);
  };

  if (entity.__typename === "LessonStructureContainer") {
    __parseElement(entity.componentContainer);
  } else if (entity.__typename === "ComponentContainer") {
    entity.sections.forEach(__parseElement);
  } else if (entity.__typename === "Section") {
    entity.components.forEach(__parseElement);
  } else if (entity.componentName === "Header") {
    // entity.props.headerState.headingLevel = checkHeadingLevel();
    entity.props.headerState = _setHeading(entity.props.headerState, level); // 3 would be 'level'
    // __parseElement(entity.props.headerState.headingLevel);
    // entity.forEach(__parseElement);
  } else if (entity.componentName === "InfoBox") {
    entity.props.infoBoxState.infoBoxHeader = _setHeading(
      entity.props.infoBoxState.infoBoxHeader,
      level
    );
  }

  // set this entity's heading level
  //   _setHeading(entity.heading, level);

  //   console.log("this is the entity:", entity);

  // This return bubbles up a level once you have scanned through that levels components
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
function _setHeading(heading, level) {
  if (level > 6) {
    throw new Error("Heading Level cannot be greater than 6.");
  }

  if (heading) {
    heading.headingLevel = "h" + level;
  }

  return heading;
}

module.exports = {
  parse: parse,
};

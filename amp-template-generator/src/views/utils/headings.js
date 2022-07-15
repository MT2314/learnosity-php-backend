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
function parse(entity, level=0) {
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
        return element = parse(element, level + 1);
    };
    
    // set heading levels of entities that are "underneath" this one
    switch (entity.type) {
        case 'lesson':
            entity.sections.forEach(__parseElement);
            break;
        case 'section':
            entity.topics.forEach(__parseElement);
            break;
        case 'topic':
        case 'tab':
            entity.components.forEach(__parseElement);
            break;
        case 'accordion':
            entity.accordionPanes.forEach(item => {
                _setHeading(item.heading, level + 1);
            });
            break;
        case 'carousel':
            entity.slides.forEach(__parseElement);
            break;
        case 'tabs':
            // parse() each tab
            entity.tabs.forEach(tab => {
                parse(tab, level - 1);
            });
            break;
        default:
            // nothing to do here, because anything else doesn't have a fancy heading.
    }

    // set this entity's heading level
    _setHeading(entity.heading, level);
    
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
        throw new Error('Heading Level cannot be greater than 6.');
    }

    if (heading) {
        heading.headingLevel = 'h' + level;
    }
}

module.exports = {
    parse: parse
};
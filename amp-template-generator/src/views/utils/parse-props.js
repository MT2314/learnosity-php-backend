/**
 *
 * @description Parses component container and transforms props into objects
 *
 * @param {object} componentContainer
 */
const transformComponentContainer = (componentContainer) => {
  for (
    let sectionIndex = 0;
    sectionIndex < componentContainer.sections.length;
    sectionIndex++
  ) {
    const section = componentContainer.sections[sectionIndex];
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
};

/**
 * Parses the props element of a
 *
 * @private
 * @param {Object} container
 */
const transformComponentPropsRecursive = (container) => {
  if (container.children) {
    for (let index = 0; index < container.children.length; index++) {
      const child = container.children[index];
      transformComponentPropsRecursive(child);
    }
  }

  if (Array.isArray(container)) {
    for (let index = 0; index < container.length; index++) {
      const lessonStructureContainer = container[index];
      transformComponentPropsRecursive(lessonStructureContainer);
    }
  }

  if (container.componentContainers) {
    for (
      let ccIndex = 0;
      ccIndex < container.componentContainers.length;
      ccIndex++
    ) {
      const componentContainer = container.componentContainers[ccIndex];
      transformComponentContainer(componentContainer);
    }
  }

  if (container.componentContainer) {
    transformComponentContainer(container.componentContainer);
  }
};

module.exports = {
  transformComponentPropsRecursive,
};

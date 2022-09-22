/**
 * Parses the props element of a 
 * 
 * @private
 * @param {Object} container 
 */

 function transformComponentPropsRecusive(container) {
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
        var componentContainer = container.componentContainers[ccIndex];
        componentContainer.sections = componentContainer.sections.sort((a, b) =>
          a.position < b.position ? -1 : 1
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
              component.parsedProps = JSON.parse(component.props);
            } catch (err) {
              console.error(err);
            }
          }
        }
      }
    }
  }
  
  module.exports = {
    transformComponentPropsRecusive: transformComponentPropsRecusive,
  };
  
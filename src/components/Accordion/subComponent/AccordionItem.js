import React from "react"
import PlaceHolder from '../subComponent/PlaceHolder'
import { useDrop } from "react-dnd";

const AccordionItem = ({accordion, accordionIndex}) => {
    const {components} = accordion

    const [{ isOver, getItem }, drop] = useDrop(() => ({
        accept: [
          "Text",
          "Image",
          "Video",
          "Table",
          "InfoBox",
          "QuoteBox",
          "IFrame",
        ],
        drop: async (item, monitor) => {
            console.log("DROPPED ITEM:", item)
        //   if (!acceptListComp(item)) setShowDropError(true);
        //   if (item.within && components.length !== 0) return;
        //   if (monitor.didDrop()) return;
        //   if (acceptListComp(item)) {
        //     dispatch({
        //       func: "ADD_COMPONENT",
        //       tabIndex: tabIndex,
        //       component: {
        //         componentName: item.componentName,
        //         componentProps: JSON.parse(item?.componentProps),
        //       },
        //     });
        //     item?.delete && item?.delete(item.tabIndex, item.compIndex);
        //   }
        },
    
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
          getItem: monitor.getItem(),
        }),
      }));

    return (
        <div data-testid="accordion-dropzone" ref={drop} style={{ background: isOver && 'green'}}>
            {
            components.length !== 0 ?
             components.map((component, compIndex) => (
                <p>{component}</p>
             )
             )   
             :<PlaceHolder/>
            }
        </div>
    )
}

export default AccordionItem;

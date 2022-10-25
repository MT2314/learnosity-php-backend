const ExtendLinkFunctionality = (id) => {
  const quillElement = document.getElementById(`toolbar-${id}`);
  const linkTooltipElement = quillElement.querySelector(".ql-tooltip");
  if (linkTooltipElement) {
    linkTooltipElement.style.display = "none";
  }
};

export default ExtendLinkFunctionality;

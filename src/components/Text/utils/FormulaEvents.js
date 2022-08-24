export const FormulaEvents = (id) => {
  const mathPixPlaceHolder = document.getElementById(
    `mathpix-placeholder-${id}`
  );

  [...document.querySelectorAll(".ql-mathpix")].forEach((item) => {
    item.addEventListener("click", (e) => {
      mathPixPlaceHolder.setAttribute(
        "data-value",
        item.getAttribute("data-value")
      );
      mathPixPlaceHolder.setAttribute("data-id", item.getAttribute("data-id"));
      mathPixPlaceHolder.setAttribute("data-clientX", e.clientX);
      mathPixPlaceHolder.setAttribute("data-clientY", e.clientY);
      mathPixPlaceHolder.click();
    });

    item.addEventListener("mouseover", (e) => {
      item.style.cursor = "default";
    });
  });
};

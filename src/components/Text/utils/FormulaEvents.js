export const FormulaEvents = (id) => {
  const mathPixPlaceHolder = document.getElementById(
    `mathpix-placeholder-${id}`
  );

  [...document.querySelectorAll(".ql-mathpix")].forEach((item) => {
    const cords = item.getBoundingClientRect();
    const left = cords.left;
    const bottom = cords.bottom + 12;

    item.addEventListener("click", () => {
      mathPixPlaceHolder.setAttribute(
        "data-value",
        item.getAttribute("data-value")
      );
      mathPixPlaceHolder.setAttribute("data-id", item.getAttribute("data-id"));
      mathPixPlaceHolder.setAttribute("data-clientX", left);
      mathPixPlaceHolder.setAttribute("data-clientY", bottom);
      mathPixPlaceHolder.click();
    });

    item.addEventListener("mouseover", () => {
      item.style.cursor = "default";
    });
  });
};

export const linkClickEvent = (id, index, text, link) => {
  const linkPlaceHolder = document.getElementById(`link-placeholder-${id}`);

  linkPlaceHolder.setAttribute("data-text", text);
  linkPlaceHolder.setAttribute("data-index", index);
  linkPlaceHolder.setAttribute("data-link", link);
  link && linkPlaceHolder.click();
};

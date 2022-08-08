import React from "react";
import ReactDOM from "react-dom";

import {
  TrashcanTooltip,
  PencilTooltip,
  ApplyTooltip,
} from "./LinkCustomIcons";

const linkValidityRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const ExtendLinkFunctionality = (id) => {
  let isEditing = false;
  let isRemoving = false;
  let isTextHighlighted = false;
  let modifyingLink = null;
  let highlightColor = null;
  let defaultColor = null;
  let savedLink = "";

  const quillElement = document.getElementById(id);

  const linkTooltipElement = quillElement.querySelector(".ql-tooltip");
  const invalidLinkMessage = document.createElement("div");

  const altQuillLink = quillElement.querySelector(".al-link");
  const defaultQuillLink = quillElement.querySelector(".ql-link");

  const quillActionBtn = quillElement.querySelector(".ql-action");
  const quillRemoveBtn = quillElement.querySelector(".ql-remove");

  const linkTooltipInput = linkTooltipElement.querySelector("input");
  const toolbarContainer = quillElement.querySelector(".toolbarContainer");
  const quillEditor = quillElement.querySelector(".ql-editor");

  const quillBgPicker = toolbarContainer.querySelector(".ql-background");
  const colorPicker = quillBgPicker.querySelector(".ql-picker-options");
  const colorOptions = colorPicker.querySelectorAll(".ql-picker-item");

  const tooltipSaveBtnContainer = document.createElement("span");
  const tooltipRemoveButtonContainer = document.createElement("span");
  const tooltipEditorButtonContainer = document.createElement("span");
  const customLinkInput = document.createElement("input");

  quillActionBtn.style.display = "none";
  quillRemoveBtn.style.display = "none";

  tooltipSaveBtnContainer.classList.add("apply-link-btn");
  tooltipEditorButtonContainer.classList.add("pencil-icon");
  tooltipRemoveButtonContainer.classList.add("trash-icon");

  quillEditor.setAttribute(
    "aria-label",
    "Hit Escape to exit the Text Component."
  );

  linkTooltipInput.style.display = "none";
  customLinkInput.setAttribute("data-link", "Paste a link");
  customLinkInput.setAttribute("data-video", "Embed URL");
  customLinkInput.setAttribute("data-formula", "e=mc^2");
  customLinkInput.setAttribute("placeholder", "Paste a link");

  [
    { insert: tooltipSaveBtnContainer, sibling: quillActionBtn },
    { insert: tooltipRemoveButtonContainer, sibling: quillRemoveBtn },
    { insert: tooltipEditorButtonContainer, sibling: quillActionBtn },
    { insert: customLinkInput, sibling: linkTooltipInput },
  ].map(({ insert, sibling }) => {
    return sibling.parentNode.insertBefore(insert, sibling.nextSibling);
  });

  invalidLinkMessage.setAttribute("class", "link-error-message-container");
  invalidLinkMessage.innerHTML = `
  <div class="link-error-message">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.96083 1.66667C5.3875 1.66667 1.66667 5.405 1.66667 10C1.66667 14.595 5.405 18.3333 10 18.3333C14.595 18.3333 18.3333 14.595 18.3333 10C18.3333 5.405 14.5775 1.66667 9.96083 1.66667ZM10 16.6667C6.32417 16.6667 3.33333 13.6758 3.33333 10C3.33333 6.32417 6.30583 3.33333 9.96083 3.33333C13.6592 3.33333 16.6667 6.32417 16.6667 10C16.6667 13.6758 13.6758 16.6667 10 16.6667Z"
            fill="#D32F2F" />
        <path d="M9.16667 5.83334H10.8333V11.6667H9.16667V5.83334ZM9.16667 12.5H10.8333V14.1667H9.16667V12.5Z"
            fill="#D32F2F" />
      </svg>
      <span>Invalid URL</span>
  </div>`;

  linkTooltipElement.appendChild(invalidLinkMessage);
  linkTooltipInput.setAttribute("data-link", "Paste a link");
  linkTooltipElement.setAttribute("tabindex", "0");

  const Trashcan = quillElement.querySelector(".trash-icon");
  const Pencil = quillElement.querySelector(".pencil-icon");
  const Apply = quillElement.querySelector(".apply-link-btn");

  ReactDOM.render(<TrashcanTooltip />, Trashcan);
  ReactDOM.render(<PencilTooltip />, Pencil);
  ReactDOM.render(<ApplyTooltip quill={quillElement} />, Apply);

  colorOptions.forEach((color, index) => {
    color.dataset.value === "#cce0f5" && (highlightColor = color);
    index === 7 && (defaultColor = color);
  });

  const setBackgroundColor = (type = "default") => {
    quillBgPicker.click();
    type !== "default" ? highlightColor.click() : defaultColor.click();
  };

  altQuillLink.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    linkTooltipElement.style.display = "";

    const selection = window.getSelection();
    if (selection.toString().length === 0) return;

    const linkStart = selection.anchorNode.parentNode.tagName === "A";
    const linkEnd = selection.focusNode.parentNode.tagName === "A";

    if (linkStart && linkEnd) {
      selection.anchorNode.parentNode.removeAttribute("href");
      altQuillLink.classList.remove("ql-selected");
      return;
    } else {
      altQuillLink.classList.add("ql-selected");

      setBackgroundColor("highlight");
      defaultQuillLink.click();
      customLinkInput.value = "";
      isTextHighlighted = true;
    }
  });

  customLinkInput.addEventListener("focus", (e) => {
    isRemoving && (customLinkInput.value = "");

    customLinkInput.classList.contains("input-error")
      ? (customLinkInput.value = e.target.value)
      : !isEditing && (customLinkInput.value = "");

    !isEditing && Apply.classList.add("disabled");
    customLinkInput.classList.remove("input-error");

    invalidLinkMessage.style.display = "none";
    quillActionBtn.style.display = "none";
    Apply.hidden = false;
  });

  customLinkInput.addEventListener("input", (e) => {
    e.target.value?.length === 0
      ? Apply.classList.add("disabled")
      : Apply.classList.remove("disabled");

    customLinkInput.classList.contains("input-error") &&
      customLinkInput.classList.remove("input-error");

    invalidLinkMessage.style.display = "none";
  });

  customLinkInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      linkTooltipInput.value = customLinkInput.value;
      Apply.click();
    }
  });

  Apply.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    linkTooltipInput.value = customLinkInput.value;

    if (Apply.classList.contains("disabled")) return;

    if (linkTooltipElement.getAttribute("data-mode") === "link") {
      if (linkTooltipInput?.value.match(linkValidityRegex)) {
        if (
          linkTooltipInput.value.indexOf("http://") === -1
            ? linkTooltipInput.value.indexOf("https://") === -1
            : linkTooltipInput.value.indexOf("https://") !== -1
        ) {
          linkTooltipInput.value = linkTooltipInput.value.replace(
            "www.",
            "http://www."
          );
        }
        savedLink = linkTooltipInput.value;
        quillActionBtn.click();
        Apply.hidden = true;
      } else {
        invalidLinkMessage.style.display = "block";
        customLinkInput.classList.add("input-error");
      }
    } else {
      quillActionBtn.click();
      isEditing = false;
    }
  });

  Trashcan.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    isEditing = false;
    isRemoving = true;
    quillActionBtn.click();
  });

  Pencil.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    isEditing = true;
    quillActionBtn.click();
  });

  document.addEventListener("click", (e) => {
    const isClickInside = linkTooltipElement.contains(e.target);
    const isClickInsideTooltip = altQuillLink.contains(e.target);

    if (!isClickInside) {
      if (isTextHighlighted && modifyingLink && !isClickInsideTooltip) {
        e.preventDefault();
        e.stopPropagation();

        isTextHighlighted = false;
        setBackgroundColor("default");
        quillElement.click();
      } else {
        invalidLinkMessage.style.display = "none";

        if (isRemoving) {
          isRemoving = false;
          linkTooltipElement.classList.remove("ql-hidden", "ql-editing");
          customLinkInput.value = savedLink;

          quillRemoveBtn.click();
        }
      }
      document.removeEventListener("click", () => {});
    }
  });

  const observeChanges = new MutationObserver((changes) => {
    modifyingLink = changes[0].target.classList.contains("ql-editing");

    Trashcan.style.display = modifyingLink ? "none" : "";
    Pencil.style.display = modifyingLink ? "none" : "";
    Apply.style.display = modifyingLink ? "" : "none";
    customLinkInput.style.display = modifyingLink ? "" : "none";

    modifyingLink && customLinkInput.select() && customLinkInput.focus();

    const closed =
      changes[0].target.classList.contains("ql-tooltip") &&
      changes[0].target.classList.contains("ql-hidden") &&
      changes[0].target.classList.contains("ql-editing");

    if (closed) {
      quillEditor.querySelectorAll("p").forEach((p) => {
        const span = p.querySelector("span");
        span && span.style.backgroundColor && span.removeAttribute("style");
        p.querySelectorAll("a").forEach((anchor) => {
          anchor.removeAttribute("style");
        });
      });

      defaultQuillLink.classList.remove("ql-selected", "ql-active");
    }
  });

  observeChanges.observe(linkTooltipElement, {
    attributes: true,
  });
};

export default ExtendLinkFunctionality;

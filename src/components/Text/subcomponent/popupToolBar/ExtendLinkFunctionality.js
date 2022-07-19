const linkValidityRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const ExtendLinkFunctionality = (id) => {
  const quillElement = document.getElementById(id);

  const linkTooltipElement = quillElement.querySelector(`.ql-tooltip`);
  const errorMessageDiv = document.createElement("div");

  errorMessageDiv.setAttribute("class", "link-error-message-container");
  errorMessageDiv.innerHTML = `
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

  linkTooltipElement.appendChild(errorMessageDiv);

  const quillActionBtn = quillElement.querySelector(".ql-action");
  const quillRemoveBtn = quillElement.querySelector(".ql-remove");

  const dummyQuillActionBtn = document.createElement("a");
  const dummyQuillRemoveBtn = document.createElement("a");
  const dummyQuillEditBtn = document.createElement("a");

  const dummyQuillActionBtnContainer = document.createElement("span");
  const dummyQuillRemoveBtnContainer = document.createElement("span");
  const dummyQuillEditBtnContainer = document.createElement("span");

  dummyQuillRemoveBtnContainer.innerHTML = `<span class="btn-container"><span>delete link</span></span>`;
  dummyQuillEditBtnContainer.innerHTML = `<span class="btn-container"><span>edit link</span></span>`;
  dummyQuillActionBtnContainer.innerHTML = `<span class="btn-container"><span>add link</span></span>`;

  quillActionBtn.style.display = "none";
  quillRemoveBtn.style.display = "none";

  dummyQuillActionBtn.setAttribute("class", "btn-action");

  const observeChanges = new MutationObserver((changes) => {
    if (!changes[0].target.classList.contains("ql-editing")) {
      dummyQuillActionBtnContainer.style.display = "none";
      dummyQuillRemoveBtn.setAttribute("class", "btn-remove");
      dummyQuillEditBtn.setAttribute("class", "btn-edit");
    } else {
      dummyQuillActionBtnContainer.style.display = "";
      dummyQuillRemoveBtn.setAttribute("class", "");
      dummyQuillEditBtn.setAttribute("class", "");
    }
  });

  observeChanges.observe(linkTooltipElement, {
    attributes: true,
  });

  const linkTooltipInput = linkTooltipElement.querySelector(`input`);

  linkTooltipInput.setAttribute("data-link", "Paste a link");

  linkTooltipInput.addEventListener("focus", (e) => {
    linkTooltipInput.value = "";

    dummyQuillActionBtn.classList.add("disabled");
    linkTooltipInput.classList.remove("input-error");

    errorMessageDiv.style.display = "none";
    quillActionBtn.style.display = "none";
    dummyQuillActionBtn.hidden = false;
  });

  linkTooltipInput.addEventListener("input", (e) => {
    e.target.value?.length === 0
      ? dummyQuillActionBtn.classList.add("disabled")
      : dummyQuillActionBtn.classList.remove("disabled");
  });

  dummyQuillActionBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (dummyQuillActionBtn.classList.contains("disabled")) return;

    if (linkTooltipElement.getAttribute("data-mode") === "link") {
      if (linkTooltipInput?.value.match(linkValidityRegex)) {
        quillActionBtn.click();
        dummyQuillActionBtn.hidden = true;
      } else {
        errorMessageDiv.style.display = "block";
        linkTooltipInput.classList.add("input-error");
      }
    } else {
      quillActionBtn.click();
    }
  });

  dummyQuillRemoveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    quillRemoveBtn.click();
  });

  dummyQuillEditBtnContainer.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    quillActionBtn.click();
  });

  linkTooltipElement.addEventListener("focus", (e) => {
    console.log("linkTooltipElement.focus");
  });

  document.addEventListener("click", (e) => {
    const isClickInside = linkTooltipElement.contains(e.target);

    if (!isClickInside) {
      errorMessageDiv.style.display = "none";
      document.removeEventListener("click", () => {});
    }
  });

  dummyQuillActionBtnContainer.appendChild(dummyQuillActionBtn);

  quillActionBtn.parentNode.insertBefore(
    dummyQuillActionBtnContainer,
    quillActionBtn.nextSibling
  );

  dummyQuillRemoveBtnContainer.appendChild(dummyQuillRemoveBtn);
  dummyQuillRemoveBtnContainer.classList.add("trash-icon");

  quillRemoveBtn.parentNode.insertBefore(
    dummyQuillRemoveBtnContainer,
    quillRemoveBtn.nextSibling
  );

  dummyQuillEditBtnContainer.appendChild(dummyQuillEditBtn);
  dummyQuillEditBtnContainer.classList.add("pencil-icon");

  quillActionBtn.parentNode.insertBefore(
    dummyQuillEditBtnContainer,
    quillActionBtn.nextSibling
  );
};

export default ExtendLinkFunctionality;

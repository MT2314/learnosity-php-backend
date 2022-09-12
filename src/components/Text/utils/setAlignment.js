class setAlignment {
  toolbar = null;
  qlFormats = null;
  alignBtn = null;
  observer = null;

  constructor(id) {
    this.toolbar = document.getElementById(id);
    this.alignBtn = this.toolbar.querySelector(`.alignment-${id}`);
    this.qlFormats = this.toolbar.querySelector(".ql-formats");

    this.observe();
  }

  mutationCallBack(mutationList) {
    let list;

    for (const mutation of mutationList) {
      if (mutation.target.classList.contains(`ql-align`)) {
        list = mutation.target.parentNode.children;
      }
    }

    if (list?.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].classList.contains("ql-active")) {
          this.alignBtn.setAttribute("data-align", list[i].value)
            ? list[i].value
            : "";
          this.alignBtn.click();
          break;
        }
      }
    }
  }

  observe() {
    this.observer = new MutationObserver(this.mutationCallBack.bind(this));
    this.observer.observe(this.qlFormats, {
      subtree: true,
      childList: true,
      attributes: true,
    });
  }

  disconnect() {
    this.observer.disconnect();
  }
}

export default setAlignment;

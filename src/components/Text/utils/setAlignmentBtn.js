class setAlignmentBtn {
  toolbar = null;
  boldBtn = null;
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
    for (const mutation of mutationList) {
      if (mutation.target.classList.contains(`ql-active`)) {
        this.alignBtn.setAttribute("data-align", mutation.target.value);
        this.alignBtn.click();
        break;
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

export default setAlignmentBtn;

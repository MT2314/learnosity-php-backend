import Quill from "quill";
const Delta = Quill.import("delta");

//regular expression that matches a url
const urlRegExp =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export const AddLinkEvents = (id) => {
  const quill = document.getElementById(id);
  const qlEditor = quill?.querySelector(".ql-editor");
  const qlTooltip = quill?.querySelector(".ql-tooltip");

  qlEditor?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const text = e.target.innerText;
      const linkHref = e.target.getAttribute("href");

      if (text === linkHref) {
        window.open(linkHref, "_blank");
        !qlTooltip.classList.contains("ql-hidden") &&
          qlTooltip.classList.add("ql-hidden");
      }
    });
    link.addEventListener("mouseover", (e) => {
      const href = link.getAttribute("href");
      const text = link.innerText;

      if (href === text) {
        e.target.style.cursor = "pointer";
      }
    });
  });
};

export const handleSelection = (range, id, quillRef) => {
  const quill = document.getElementById(id);
  const quillTooltip = quill?.querySelector(".ql-tooltip");
  const linkBtn = quill?.querySelector(".al-link");

  if (range?.length) {
    const format = quillRef.getEditor().getFormat();
    if (format.hasOwnProperty("link")) {
      linkBtn.classList.add("ql-selected");
    } else {
      linkBtn.classList.remove("ql-selected");
    }
  }
  if (range?.length === 0) {
    const format = quillRef.getEditor().getFormat();

    if (format.hasOwnProperty("link")) {
      const linkRange = quillRef.getEditor().getSelection();
      const [leaf, _] = quillRef.getEditor().getLeaf(linkRange.index);
      const index = quillRef.getEditor().getIndex(leaf);
      const delta = quillRef
        .getEditor()
        .getContents(index, leaf.domNode.length);

      if (delta) {
        const text = delta?.ops[0]?.insert;
        const link = delta?.ops[0]?.attributes?.link;
        if (text === link) {
          quillTooltip.classList.remove("ql-hidden");
        } else {
          quillTooltip.style.display = "";
        }
      }
    }
  }
};

export const checkTextForUrl = (quill) => {
  const sel = quill.getSelection();
  if (!sel) {
    return;
  }
  const [leaf] = quill.getLeaf(sel.index);
  const leafIndex = quill.getIndex(leaf);

  if (!leaf.text) {
    return null;
  }

  const relevantLength = sel.index - leafIndex;
  const text = leaf.text.slice(0, relevantLength);
  if (!text || leaf.parent.domNode.localName === "a") {
    return null;
  }

  const nextLetter = leaf.text[relevantLength];
  if (nextLetter != null && nextLetter.match(/\S/)) {
    return null;
  }

  const urlMatches = text.match(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  );

  if (urlMatches) {
    const match = urlMatches.pop();
    const matchIndex = text.lastIndexOf(match);
    const after = text.split(match).pop();
    if (after.match(/\S/)) {
      return null;
    }

    const index = leafIndex + matchIndex;
    const string = match.trim();
    const ops = new Delta()
      .retain(index)
      .retain(string.length, { link: string });

    return ops;
  }
};

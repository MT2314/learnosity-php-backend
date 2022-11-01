import Quill from "quill";
const Delta = Quill.import("delta");

export const checkTextForUrl = (quill) => {
  const sel = quill?.getSelection();
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

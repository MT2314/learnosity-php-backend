const urlRegExp =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;

export const defaultAnchorState = {
  removeRange: null,
  insertRange: null,
  linkText: null,
  anchorTextEqualToLink: null,
  removeFormat: null,
  placeSelectionRight: null,
};

export const ModifyAnchorText = (editorContent, quillText) => {
  const ops = editorContent.ops;

  let removeIndex = null;
  let removeLength = null;
  let insertIndex = null;
  let insertLength = null;

  let removeFormat = false;
  let placeSelectionRight = false;
  let anchorTextEqualToLink = false;
  let breakLoop = false;

  let anchorText = "";
  let linkText = "";

  for (const [i, delta] of ops.entries()) {
    if (breakLoop) {
      break;
    }
    if (delta?.attributes?.link) {
      linkText = delta.attributes.link;
      anchorText = delta.insert;

      removeIndex = quillText.indexOf(anchorText);
      removeIndex !== -1 && (removeLength = anchorText.length);

      anchorTextEqualToLink = anchorText === linkText;

      const left = ops[i - 1]?.insert ? ops[i - 1].insert.length : null;

      if (
        left &&
        ops[i - 1]?.insert?.slice(left - 1) !== " " &&
        ops[i - 1]?.insert?.slice(left - 1) !== "\n" &&
        !ops[i - 1]?.attributes?.link &&
        !breakLoop
      ) {
        insertIndex = removeIndex - 1;
        const pre = ops[i - 1]?.insert?.slice(left - 1);
        const compare = pre + linkText;

        if (anchorTextEqualToLink) {
          if (urlRegExp.test(compare)) {
            pre.concat(linkText);
            breakLoop = true;
          }
        } else {
          insertLength = removeLength + 1;
          breakLoop = true;
        }
      }

      if (
        ops[i + 1]?.insert[0] !== " " &&
        ops[i + 1]?.insert[0] &&
        ops[i + 1]?.insert[0] !== "\n" &&
        !ops[i + 1]?.attributes?.link &&
        !breakLoop
      ) {
        insertLength = removeLength + 1;
        const append = ops[i + 1]?.insert[0];
        const compare = linkText + append;
        if (anchorTextEqualToLink) {
          if (urlRegExp.test(compare)) {
            linkText.concat(append);
            placeSelectionRight = true;
            breakLoop = true;
          }
        } else {
          breakLoop = true;
        }
      }

      if (!anchorTextEqualToLink && !breakLoop) {
        const insertFromStart =
          anchorText === linkText.slice(0, -1) && !breakLoop;
        const insertFromEnd =
          anchorText === linkText.substring(1) && !breakLoop;

        linkText = insertFromStart
          ? linkText.slice(0, -1)
          : insertFromEnd
          ? linkText.substring(1)
          : linkText;

        removeFormat = insertFromStart || insertFromEnd;
        breakLoop = insertFromStart || insertFromEnd;
      }

      removeIndex !== -1 &&
        !breakLoop &&
        (quillText = quillText.replace(anchorText, "|".repeat(removeLength)));
    }
  }

  !insertIndex && (insertIndex = removeIndex);
  !insertLength && (insertLength = removeLength);

  const removeRange = { index: removeIndex, length: removeLength };
  const insertRange = { index: insertIndex, length: insertLength };

  const update = insertIndex === removeIndex && insertLength === removeLength;

  return {
    removeRange,
    insertRange,
    linkText: update ? null : linkText,
    anchorTextEqualToLink: update ? null : !anchorTextEqualToLink,
    removeFormat: update ? removeFormat : null,
    placeSelectionRight,
  };
};

export const ConvertLinks = (editorContent, quillText) => {
  const ops = editorContent.ops;

  let startLinkIndex = null;
  let endLinkIndex = null;
  let linkTextIndex = null;
  let linkText = null;

  for (const delta of ops) {
    if (!delta?.attributes?.link && delta.insert) {
      const deltaText = delta?.insert;
      const textArray = deltaText.split(/(\s+)/).filter((t) => t.length > 0);

      linkTextIndex = textArray.findIndex((t) => urlRegExp.test(t));

      linkTextIndex !== -1 && (linkText = textArray[linkTextIndex]);

      if (linkText) {
        startLinkIndex = quillText.indexOf(linkText);
        if (startLinkIndex !== -1) {
          endLinkIndex = linkText.length;
          break;
        }
      }
    }
    if (delta?.attributes?.link && delta.insert) {
      const insert = delta.insert;
      const index = quillText.indexOf(insert);
      const length = insert.length;
      index !== -1 &&
        (quillText = quillText.replace(insert, "|".repeat(length)));
    }
  }

  return { link: linkText, startLinkIndex, endLinkIndex };
};

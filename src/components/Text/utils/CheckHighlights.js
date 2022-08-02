const CheckHighlights = (editorContent) => {
  const ops = editorContent.ops;

  for (const delta of ops) {
    if (delta?.attributes?.background) {
      return false;
    }
  }
  return true;
};

export default CheckHighlights;

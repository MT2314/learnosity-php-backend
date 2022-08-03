const CheckHighlights = (editorContent) => {
  //variable declaration
  const ops = editorContent.ops;
  //loop through delta
  for (const delta of ops) {
    if (delta?.attributes?.background) {
      //if a delta contains a background attribute return false
      return false;
    }
  }
  //if no background attribute return true
  return true;
};

export default CheckHighlights;

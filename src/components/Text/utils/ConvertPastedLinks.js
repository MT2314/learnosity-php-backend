// import normalizeUrl from "normalize-url";

// const pasteLink = (node, delta) => {
//   console.log("Paste ", node.data);
//   if (typeof node.data !== "string") {
//     return;
//   }
//   console.log("Here");
//   const urlRegExp = /(https?:\/\/|www\.)[\w-\.]+\.[\w-\.]+(\/([\S]+)?)?/gi;
//   const mailRegExp = /([\w-\.]+@[\w-\.]+\.[\w-\.]+)/gi;
//   urlRegExp.lastIndex = 0;
//   mailRegExp.lastIndex = 0;
//   const newDelta = new Delta();
//   let index = 0;
//   let urlResult = urlRegExp.exec(node.data);
//   console.log("Url Result", urlResult);
//   let mailResult = mailRegExp.exec(node.data);
//   const handleMatch = (result, regExp, normalizer) => {
//     const head = node.data.substring(index, result.index);
//     newDelta.insert(head);
//     const match = result[0];
//     console.log("MATCHANGE ", match);
//     newDelta.insert(match, { link: normalizer(match) });
//     console.log("NEWDELTA ", newDelta);
//     index = regExp.lastIndex;
//     console.log("Here 3");
//     return regExp.exec(node.data);
//   };
//   console.log("Here 2");
//   while (urlResult !== null || mailResult !== null) {
//     if (urlResult === null) {
//       mailResult = handleMatch(mailResult, mailRegExp, mailNormalizer);
//     } else if (mailResult === null) {
//       urlResult = handleMatch(urlResult, urlRegExp, urlNormalizer);
//     } else if (mailResult.index <= urlResult.index) {
//       while (urlResult !== null && urlResult.index < mailRegExp.lastIndex) {
//         urlResult = urlRegExp.exec(node.data);
//       }
//       mailResult = handleMatch(mailResult, mailRegExp, mailNormalizer);
//     } else {
//       while (mailResult !== null && mailResult.index < urlRegExp.lastIndex) {
//         mailResult = mailRegExp.exec(node.data);
//       }
//       urlResult = handleMatch(urlResult, urlRegExp, urlNormalizer);
//     }
//   }
//   if (index > 0) {
//     console.log("Inside Tail");
//     const tail = node.data.substring(index);
//     newDelta.insert(tail);
//     console.log("Delta ops ", newDelta.ops);
//     delta.ops = newDelta.ops;
//   }
//   console.log("DELTA ", delta);
//   return delta;
// };

// function normalize(url) {
//   const regex = /(https?:\/\/|www\.)[\S]+/i;
//   if (regex.test(url)) {
//     try {
//       return normalizeUrl(url, { stripWWW: false });
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   return url;
// }
// const urlNormalizer = (url) => normalize(url);
// const mailNormalizer = (mail) => `mailto:${mail}`;

// const CustomMatcher = (node, delta) => {
//   console.log("Link ", node);
//   const href = node.getAttribute("href");
//   const attributes = delta.ops[0]?.attributes;
//   if (attributes?.link != null) {
//     attributes.link = href;
//   }
//   return delta;
// };

const ConvertPastedLinks = (Delta, editorContent) => {
  // console.log("Converting ", editorContent);
  const ops = [...editorContent.ops];
  const newDelta = new Delta().insert(" https://quilljs.com/docs/delta/\n");

  let newOps;
  let index;
  let link = null;
  const final = editorContent.concat(newDelta);
  const length = editorContent.ops.length;
  const copy = editorContent.ops[0].insert;
  /* Adding a new line to the editor. */
  // editorContent.ops[0].insert = `{${copy} testing}`;
  // editorContent.ops[1].insert = "https://quilljs.com/docs/delta/";
  // editorContent.ops[2].attributes.link = "https://quilljs.com/docs/delta/";
  // console.log("Converted ", final);

  // const text = " https://quilljs.com/docs/delta/\n";
  // split text by space and \n and and keep space and \n

  // const textArray = text.split(/(\s+)/).filter((t) => t.length > 0);
  /* Checking if the last element in the editor has a link attribute. If it doesn't, it adds it. */
  // console.log("Text Array ", newOps);
  const urlRegExp = /(https?:\/\/|www\.)[\w-\.]+\.[\w-\.]+(\/([\S]+)?)?/gi;

  if (!ops[length - 1]?.attributes?.link && ops[length - 1].insert) {
    console.log("No Link");
    // ops[length - 1].attributes = { link: "https://quilljs.com/docs/delta/" };
    const text = ops[length - 1].insert;
    const textArray = text.split(/(\s+)/).filter((t) => t.length > 0);

    //check textArray and match to regex urlRegExp
    for (let i = 0; i < textArray.length; i++) {
      if (urlRegExp.test(textArray[i])) {
        console.log("Match");
        index = i;
      }
    }

    // create a new array of objects with insert attribute and and if index add link attribute
    if (index !== undefined) {
      newOps = textArray.map((t) => {
        if (index === textArray.indexOf(t)) {
          link = t;
          return {
            insert: t,
            attributes: { link: t },
          };
        } else {
          return { insert: t };
        }
      });
      console.log("New Ops ", newOps);
    }
  }

  if (index !== undefined) {
    console.log("Returning ", newOps);
    return [new Delta(newOps), link];
  } else {
    return [editorContent, link];
  }
};

export default ConvertPastedLinks;

import Quill from "quill";
const Delta = Quill.import("delta");

//WIP
export const matchText = (node, delta) => {
  if (typeof node.data !== "string") {
    console.log("Not a string");
    return;
  }

  const urlRegExp =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  let ops = [];

  const splitData = node.data.split(" ");

  const links = splitData.find((data) => urlRegExp.exec(data));

  let text = "";

  links &&
    splitData.forEach((data) => {
      let urlResult = urlRegExp.exec(data);
      if (urlResult !== null) {
        const match = urlResult[0];
        console.log("MATH:", match);
        if (text) {
          ops.push({ insert: text + " " });
          text = "";
        }

        const matchTrim = match.trim();
        ops.push({ insert: matchTrim, attributes: { link: match } });
      } else {
        !text ? (text = data) : (text = text + " " + data);
      }
    });
  links && text && ops.push({ insert: ops.length > 0 ? " " + text : text });

  return links ? new Delta(ops) : delta;
};

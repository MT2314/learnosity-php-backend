import Quill from "quill";
const Delta = Quill.import("delta");

export const matchMsWordList = (node, delta) => {
  // Clone the operations
  let ops = delta.ops.map((op) => Object.assign({}, op));

  // Trim the front of the first op to remove the bullet/number
  let bulletOp = ops.find((op) => op.insert && op.insert.trim().length);
  if (!bulletOp) {
    return delta;
  }

  bulletOp.insert = bulletOp.insert.trimLeft();
  let listPrefix = bulletOp.insert.match(/^.*?(^·|\.)/) || bulletOp.insert[0];
  bulletOp.insert = bulletOp.insert
    .substring(listPrefix[0].length, bulletOp.insert.length)
    .trimLeft();

  // Trim the newline off the last op
  let last = ops[ops.length - 1];
  last.insert = last.insert.substring(0, last.insert.length - 1);

  // Determine the list type
  let listType = listPrefix[0].length === 1 ? "bullet" : "ordered";

  // Determine the list indent
  let style = node?.getAttribute("style")?.replace(/\n+/g, "");
  const margin = style.split(";")[0].split(" ").pop().replace("pt", "");
  const indent = Math.round(margin / 36);

  // Add the list attribute
  ops.push({
    insert: "\n",
    attributes: { list: listType, indent: indent - 1 },
  });

  return new Delta(ops);
};

export const maybeMatchMsWordList = (node, delta) => {
  if (
    delta.ops[0]?.insert?.trimLeft()[0] === "·" ||
    delta.ops[0]?.insert?.trimLeft()[0] === "o" ||
    delta.ops[0]?.insert
      ?.trimLeft()
      ?.substring(0, 3)
      ?.match(/^(\d+\.\s)/)
  ) {
    return matchMsWordList(node, delta);
  }

  return delta;
};

import Quill from "quill";
const Delta = Quill.import("delta");

export const matchSpan = (node, delta) => {
  if (delta.ops[0]?.attributes?.background) {
    return new Delta().insert(delta.ops[0].insert);
  }

  if (node.style.top || node.style.bottom) {
    let ops = [];

    node.style.top &&
      ops.push({
        insert: delta.ops[0].insert,
        attributes: { script: "super" },
      });

    node.style.bottom &&
      ops.push({
        insert: delta.ops[0].insert,
        attributes: { script: "sub" },
      });

    return new Delta(ops);
  }

  return delta;
};

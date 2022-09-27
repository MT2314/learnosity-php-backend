import Quill from "quill";
const Delta = Quill.import("delta");

export const matchSpan = (node, delta) => {
  if (delta.ops[0]?.attributes?.background) {
    return new Delta().insert(delta.ops[0].insert);
  }

  return delta;
};

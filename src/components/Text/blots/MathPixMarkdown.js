import Quill from "quill";
import { MathpixMarkdownModel } from "mathpix-markdown-it";
import { v4 as uuidv4 } from "uuid";
let Embed = Quill.import("blots/embed");

const options = {
  display: "inline-block",
  alignMathBlock: "left",
  outMath: {
    include_asciimath: true,
    include_smiles: true,
    include_mathml: true,
    include_latex: true,
    include_svg: true,
    include_tsv: true,
    include_table_html: true,
  },
};

class MathPixMarkdown extends Embed {
  static blotName = "mathpix";
  static tagName = "SPAN";
  static className = "ql-mathpix";

  static create(value) {
    const node = super.create(value);
    if (typeof value === "string") {
      const md = value.includes("<smiles>") ? value : "\\(" + value + "\\)";
      node.appendChild(this.md2svg(MathpixMarkdownModel.render(md, options)));
      node.contentEditable = "true";
      node.setAttribute("data-id", `${uuidv4()}`);
      node.setAttribute("data-value", value);
    }
    node.innerHTML += "&nbsp";
    return node;
  }

  static value(domNode) {
    return domNode.getAttribute("data-value");
  }

  static md2svg(text) {
    const MathPixNode = document.createElement("DIV");
    MathPixNode.style.visibility = "hidden";
    MathPixNode.innerHTML = text;
    document.body.appendChild(MathPixNode);

    const svg = MathPixNode.querySelector("svg");
    document.body.removeChild(MathPixNode);
    return svg;
  }

  static formats(domNode) {
    return { id: domNode.getAttribute("data-id") };
  }

  format(name, value) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      // @ts-expect-error
      this.domNode.setAttribute("data-id", `${uuidv4()}`);
    }
  }

  html() {
    const { mathpix } = this.value();
    return `<span >${mathpix}</span>`;
  }
}

export default MathPixMarkdown;

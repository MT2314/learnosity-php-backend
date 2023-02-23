const fs = require("fs");
const path = require("path");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let quillFilePath = require.resolve("quill");
let quillMinFilePath = quillFilePath.replace("quill.js", "quill.min.js");

let quillLibrary = fs.readFileSync(quillMinFilePath);
let mutationObserverPolyfill = fs.readFileSync(
  path.join(__dirname, "polyfill.js")
);

const JSDOM_TEMPLATE = `
  <div id="editor">hello</div>
  <script>${mutationObserverPolyfill}</script>
  <script>${quillLibrary}</script>
  <script>
    document.getSelection = function() {
      return {
        getRangeAt: function() { }
      };
    };
    document.execCommand = function (command, showUI, value) {
      try {
          return document.execCommand(command, showUI, value);
      } catch(e) {}
      return false;
    };
  </script>
`;
const JSDOM_OPTIONS = { runScripts: "dangerously", resources: "usable" };

exports.convertTextToDelta = text => {
  const DOM = new JSDOM(JSDOM_TEMPLATE, JSDOM_OPTIONS);
  const QUILL = new DOM.window.Quill("#editor");

  QUILL.setText(text);

  let delta = QUILL.getContents();
  DOM.window.close();
  return delta;
};

exports.convertHtmlToDelta = html => {
  const DOM = new JSDOM(JSDOM_TEMPLATE, JSDOM_OPTIONS);
  const QUILL = new DOM.window.Quill("#editor");

  let delta = QUILL.clipboard.convert(html);
  DOM.window.close();
  return delta;
};

exports.convertDeltaToHtml = delta => {
  const DOM = new JSDOM(JSDOM_TEMPLATE, JSDOM_OPTIONS);
  const QUILL = new DOM.window.Quill("#editor");
  let Embed = DOM.window.Quill.import("blots/embed");

  class MathPixMarkdown extends Embed {
    static blotName = "mathpix";
    static tagName = "SPAN";
    static className = "ql-mathpix";
  
    static create(value) {
      const node = super.create(value);
      if (typeof value === "string") {
        const md = "\\(" + value + "\\)";
        const MathPixNode = DOM.window.document.createElement("span");
        MathPixNode.innerHTML = md;
        node.append(MathPixNode);
      }
      return node;
    }

  }

  DOM.window.Quill.register("formats/mathpix", MathPixMarkdown);

  QUILL.setContents(delta);

  let html = QUILL.root.innerHTML;
  DOM.window.close();
  return html;
};

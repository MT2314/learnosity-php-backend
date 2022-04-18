const toolbarOptions = {
  options: ["inline", "textAlign", "list", "link"],
  inline: {
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "superscript",
      "subscript",
    ],
    bold: { className: "bordered-option-classname" },
    italic: { className: "bordered-option-classname" },
    underline: { className: "bordered-option-classname" },
    strikethrough: { className: "bordered-option-classname" },
    code: { className: "bordered-option-classname" },
  },
  textAlign: {
    options: ["left", "center", "right", "justify"],
  },
  link: {
    options: ["link", "unlink"],
  },
};

export default toolbarOptions;

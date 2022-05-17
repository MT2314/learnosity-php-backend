
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
  },
  textAlign: {
    options: ["left", "center", "right", "justify"],
  },
  link: {
    options: ["link", "unlink"],
    link: { className: "bordered-option-classname" },
    unlink: { className: "bordered-option-classname" },
  },
};

export default toolbarOptions;

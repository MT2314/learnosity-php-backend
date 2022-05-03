export const calloutConfig = {
  options: ["inline", "link", "list"],
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
  link: {
    options: ["link", "unlink"],
    link: { className: "bordered-option-classname" },
    unlink: { className: "bordered-option-classname" },
  },
};


export const inlineWithLinkConfig = {
  options: ["inline", "link"],
  inline: {
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
    ],
  },
  link: {
    options: ["link", "unlink"],
    link: { className: "bordered-option-classname" },
    unlink: { className: "bordered-option-classname" },
  },
};

export const linkConfig = {
  options: ["link"],
  link: {
    options: ["link", "unlink"],
    link: { className: "bordered-option-classname" },
    unlink: { className: "bordered-option-classname" },
  },
};
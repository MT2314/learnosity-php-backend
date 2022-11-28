const Basic = [
  {
    text: "+",
    insert: "+",
  },
  {
    text: "-",
    insert: "-",
  },
  {
    text: "\\cdot",
    insert: "\\cdot",
  },
  {
    text: "\\times",
    insert: "\\times",
  },
  {
    text: "\\div",
    insert: "\\div",
  },
  {
    text: "\\frac{\\square}{\\square}",
    insert: "\\frac{#0}{#1}",
  },
  {
    text: "=",
    insert: "=",
  },
  {
    text: "\\neq",
    insert: "\\neq",
  },
  {
    text: "\\pi",
    insert: "\\pi",
  },
  {
    text: "e",
    insert: "e",
  },
  {
    text: "\\sqrt[\\square]{\\square}",
    insert: "\\sqrt[#0]{#0}",
  },
  {
    text: "{x}^{\\square}",
    insert: "{#0}^{#1}",
  },
  {
    text: "{\\square}^2",
    insert: "#0^2",
  },
  {
    text: "\\square^{\\square}",
    insert: "{#0}^{#0}",
  },
  {
    text: "\\square_{\\square}",
    insert: "{#0}_{#0}",
  },
  {
    text: "\\sqrt{\\square}",
    insert: "\\sqrt{#0}",
  },
  {
    text: "\\log",
    insert: "\\log",
  },
  {
    text: "\\log_{\\square}",
    insert: "\\log_{#0}",
  },
  {
    text: "\\ln",
    insert: "\\ln",
  },
  {
    text: "\\amalg",
    insert: "\\amalg",
  },
  {
    text: "\\And",
    insert: "\\And",
  },
  {
    text: "\\left[\\begin{smallmatrix} \\square \\\\ \\square \\end{smallmatrix}\\right]",
    insert:
      "\\left[\\begin{smallmatrix} {#0} \\\\ {#1} \\end{smallmatrix}\\right]",
  },
  {
    text: "\\lbrace\\begin{smallmatrix} \\square \\\\ \\square \\end{smallmatrix}\\rbrace",
    insert:
      "\\lbrace\\begin{smallmatrix} {#0} \\\\ {#1} \\end{smallmatrix}\\rbrace",
  },
  {
    text: "\\binom{\\square}{\\square}",
    insert: "\\binom{#0}{#1}",
  },
  {
    text: "<",
  },
  {
    text: ">",
  },
  {
    text: "\\leq",
    insert: "\\leq",
  },
  {
    text: "\\geq",
    insert: "\\geq",
  },
  {
    text: "\\equiv",
    insert: "\\equiv",
  },
  {
    text: "\\approx",
    insert: "\\approx",
  },
  {
    text: "\\in",
    insert: "\\in",
  },
  {
    text: "\\notin",
    insert: "\\notin",
  },
];

export default Basic;

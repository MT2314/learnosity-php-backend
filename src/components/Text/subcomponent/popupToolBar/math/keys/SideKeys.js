import {
  PlaceHolder,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "../MathIcons";

export const TopSideKeys = [
  {
    insert: "\\left(",
    text: "left",
    aria: "left parenthesis",
    svg: PlaceHolder,
    color: "rgba(21, 101, 192, 0.12)",
    hover: "rgba(21, 101, 192, 0.3)",
  },
  {
    insert: "\\right)",
    text: "right",
    aria: "right parenthesis",
    svg: PlaceHolder,
    color: "rgba(21, 101, 192, 0.12)",
    hover: "rgba(21, 101, 192, 0.3)",
  },
  {
    insert: "=",
    text: "=",
    aria: "equals",
    svg: PlaceHolder,
    color: "rgba(21, 101, 192, 0.12)",
    hover: "rgba(21, 101, 192, 0.3)",
    width: "70px",
  },
  {
    text: "7",
    aria: "seven",
    insert: "7",
  },
  {
    text: "8",
    aria: "eight",
    insert: "8",
  },
  {
    text: "9",
    aria: "nine",
    insert: "9",
  },
  {
    text: "\\div",
    aria: "divide",
    svg: PlaceHolder,
    color: "rgba(21, 101, 192, 0.12)",
    hover: "rgba(21, 101, 192, 0.3)",
  },
  {
    text: "4",
    aria: "four",
    insert: "4",
  },
  {
    text: "5",
    aria: "five",
    insert: "5",
  },
  {
    text: "6",
    aria: "six",
    insert: "6",
  },
  {
    insert: "\\times",
    text: "times",
    aria: "multiply",
    svg: PlaceHolder,
    color: "rgba(21, 101, 192, 0.12)",
    hover: "rgba(21, 101, 192, 0.3)",
  },
  {
    text: "1",
    aria: "one",
    insert: "1",
  },
  {
    text: "2",
    aria: "two",
    insert: "2",
  },
  {
    text: "3",
    aria: "three",
    insert: "3",
  },
  {
    insert: "-",
    text: "minus",
    aria: "minus",
    svg: PlaceHolder,
    color: "rgba(21, 101, 192, 0.12)",
    hover: "rgba(21, 101, 192, 0.3)",
  },
  {
    text: "0",
    insert: "0",
    aria: "zero",
  },
  {
    text: "00",
    insert: "00",
    aria: "double zero",
  },
  {
    text: ".",
    insert: ".",
    aria: "decimal",
  },
  {
    insert: "+",
    text: "plus",
    aria: "plus",
    svg: PlaceHolder,
    color: "rgba(21, 101, 192, 0.12)",
    hover: "rgba(21, 101, 192, 0.3)",
  },
];

export const BottomLeftKeys = [
  {
    command: "deleteBackward",
    text: "delete backward",
    aria: "delete backward",
    svg: PlaceHolder,
  },

  {
    svg: ArrowUp,
    text: "up",
    aria: "up",
    command: "moveUp",
  },
  {
    command: "deleteForward",
    text: "delete forward",
    aria: "delete forward",
    svg: PlaceHolder,
  },
  {
    svg: ArrowLeft,
    text: "left",
    aria: "left",
    command: "moveToPreviousChar",
  },
  {
    svg: ArrowDown,
    text: "down",
    aria: "down",
    command: "moveDown",
  },
  {
    svg: ArrowRight,
    text: "right",
    aria: "right",
    command: "moveToNextChar",
  },
];

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
    svg: PlaceHolder,
    color: "rgba(21, 101, 192, 0.12)",
    hover: "rgba(21, 101, 192, 0.3)",
  },
  {
    insert: "\\right)",
    svg: PlaceHolder,
    color: "rgba(21, 101, 192, 0.12)",
    hover: "rgba(21, 101, 192, 0.3)",
  },
  {
    insert: "=",
    svg: PlaceHolder,
    color: "rgba(21, 101, 192, 0.12)",
    hover: "rgba(21, 101, 192, 0.3)",
    width: "70px",
  },
  {
    text: "7",
    insert: "7",
  },
  {
    text: "8",
    insert: "8",
  },
  {
    text: "9",
    insert: "9",
  },
  {
    text: "\\div",
    svg: PlaceHolder,
    color: "rgba(21, 101, 192, 0.12)",
    hover: "rgba(21, 101, 192, 0.3)",
  },
  {
    text: "4",
    insert: "4",
  },
  {
    text: "5",
    insert: "5",
  },
  {
    text: "6",
    insert: "6",
  },
  {
    insert: "\\times",
    svg: PlaceHolder,
    color: "rgba(21, 101, 192, 0.12)",
    hover: "rgba(21, 101, 192, 0.3)",
  },
  {
    text: "1",
    insert: "1",
  },
  {
    text: "2",
    insert: "2",
  },
  {
    text: "3",
    insert: "3",
  },
  {
    insert: "-",
    svg: PlaceHolder,
    color: "rgba(21, 101, 192, 0.12)",
    hover: "rgba(21, 101, 192, 0.3)",
  },
  {
    text: "0",
    insert: "0",
  },
  {
    text: "00",
    insert: "00",
  },
  {
    text: ".",
    insert: ".",
  },
  {
    insert: "+",
    svg: PlaceHolder,
    color: "rgba(21, 101, 192, 0.12)",
    hover: "rgba(21, 101, 192, 0.3)",
  },
];

export const BottomLeftKeys = [
  {
    command: "deleteBackward",
    svg: PlaceHolder,
  },
  {
    svg: ArrowUp,
    command: "moveUp",
  },
  {
    command: "deleteBackward",
    svg: PlaceHolder,
  },
  {
    svg: ArrowLeft,
    command: "moveToPreviousChar",
  },
  {
    svg: ArrowDown,
    command: "moveDown",
  },
  {
    svg: ArrowRight,
    command: "moveToNextChar",
  },
];

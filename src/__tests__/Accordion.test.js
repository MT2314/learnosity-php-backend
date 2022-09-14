import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccordionMain from "../components/Accordion/AccordionMain";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const testLayout = [
  {
    id: 0,
    title: "",
    placeholderTitle: "TVO",
    components: [],
  },
  {
    id: 1,
    title: "",
    placeholderTitle: "Polkaroo",
    components: [],
  },
];

describe("Accordion", () => {
  it("Renders Accordion Component with default 2 panes", async () => {
    render(<AccordionMain layoutState={testLayout} />);

    expect(screen.getByText(/polkaroo/i)).toBeInTheDocument();
    expect(screen.getByText(/tvo/i)).toBeInTheDocument();
  });

  // it("Displays placeholder text", async () => {
  //   render(<AccordionMain layoutState={testLayout} />);
  //   expect(screen.getByText(/accepted components/i)).toBeInTheDocument();
  // })
})
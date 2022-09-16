import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccordionMain from "../components/Accordion/AccordionMain";
import {layoutConfig} from "../Context/InteractivesContext"

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

    expect(screen.getByPlaceholderText(/polkaroo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tvo/i)).toBeInTheDocument();
  });

  it('updates the titles', async () => {
    render(<AccordionMain layoutState={testLayout}/>)
    layoutConfig(testLayout, {
      func: "CHANGE_TITLE",
      title: "Polkaroo Forever",
      layerIndex: 0
    })

    expect(testLayout[0].title).toBe("Polkaroo Forever")
  })
})
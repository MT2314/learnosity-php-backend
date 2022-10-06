import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import produce from "immer";
import "@testing-library/jest-dom";
import AccordionMain from "../components/Accordion/AccordionMain";
import "../Icons/componentIcons/Vector.svg";

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
    title: "Pane 1",
    placeholderTitle: "Pane 1",
    components: [],
    expanded: true,
  },
  {
    id: 1,
    title: "Pane 2",
    placeholderTitle: "Pane 2",
    components: [],
    expanded: false,
  },
];

describe("Renders Accordion Component with default props", () => {
  it("Renders Accordion Panes with default data", async () => {
    render(<AccordionMain layoutState={testLayout} setProp={() => {}} />);
    expect(screen.getByText(/Pane 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Pane 2/i)).toBeInTheDocument();
  });
  it("Displays placeholder text within Accordion", () => {
    render(<AccordionMain layoutState={testLayout} />);
    expect(
      screen.getAllByText(/Add a component here!/i)[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        /Drag and drop a component from the left panel or use your keyboard to insert a component./i
      )[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        /Accepted components: text, image, chart, table, video, and audio./i
      )[0]
    ).toBeInTheDocument();
  });
});
describe("Expanding and Collapse Panes", () => {
  it("Chevron is rendered for each pane", async () => {
    render(<AccordionMain layoutState={testLayout} setProp={() => {}} />);
    expect(screen.getAllByTestId("ExpandMoreIcon")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("ExpandMoreIcon")[1]).toBeInTheDocument();
  });
  it("On click of chevron pane opens and closes", async () => {
    render(<AccordionMain layoutState={testLayout} setProp={() => {}} />);
    const expandChevron = screen.getAllByTestId("ExpandMoreIcon")[0];
    // Expect one expanded and not expanded
    expect(screen.getByRole("button", { expanded: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { expanded: false })).toBeInTheDocument();
    fireEvent.click(expandChevron);
  });
});
describe("Check if toolbar renders", () => {
  it("check for the 4 actions within toolbar", async () => {
    render(<AccordionMain layoutState={testLayout} setProp={() => {}} />);
    expect(screen.getByTestId("ArrowUpwardIcon")).toBeInTheDocument();
    expect(screen.getByTestId("ArrowDownwardIcon")).toBeInTheDocument();
    expect(screen.getByTestId("AddIcon")).toBeInTheDocument();
    expect(screen.getByTestId("RemoveIcon")).toBeInTheDocument();
  });
});
describe("Check if toolbar Move Pane Up/Down Work", () => {
  it("move pane upward with toolbar", () => {
    render(<AccordionMain layoutState={testLayout} setProp={() => {}} />);
    const pane = screen.getByRole("button", { expanded: false });
    fireEvent.click(pane);
    const moveUp = screen.getByTestId("ArrowUpwardIcon");
    expect(pane).toHaveAttribute("accordionindex", "1");
    fireEvent.click(moveUp);
    const pane2 = screen.getByRole("button", { expanded: false });
    expect(pane2).toHaveAttribute("accordionindex", "0");
  });
  it("move pane downward with toolbar", () => {
    render(<AccordionMain layoutState={testLayout} setProp={() => {}} />);
    const pane = screen.getByRole("button", { expanded: true });
    fireEvent.click(pane);
    const moveDown = screen.getByTestId("ArrowDownwardIcon");
    expect(pane).toHaveAttribute("accordionindex", "0");
    fireEvent.click(moveDown);
    const pane2 = screen.getByRole("button", { expanded: true });
    expect(pane2).toHaveAttribute("accordionindex", "1");
  });
  it("moving pane circles around, from last index to first and vice versa", () => {
    render(<AccordionMain layoutState={testLayout} setProp={() => {}} />);
    const pane = screen.getByRole("button", { expanded: true });
    fireEvent.click(pane);
    const moveDown = screen.getByTestId("ArrowDownwardIcon");
    expect(pane).toHaveAttribute("accordionindex", "0");
    fireEvent.click(moveDown);
    const pane2 = screen.getByRole("button", { expanded: true });
    expect(pane2).toHaveAttribute("accordionindex", "1");
    fireEvent.click(moveDown);
    const pane3 = screen.getByRole("button", { expanded: true });
    expect(pane3).toHaveAttribute("accordionindex", "0");
  });
});

describe("Check if toolbar renders", () => {
  it("add a new pane with toolbar", async () => {
    render(<AccordionMain layoutState={testLayout} setProp={() => {}} />);
    const addPane = screen.getByTestId("AddIcon");
    fireEvent.click(addPane);
    expect(screen.getByText(/Pane 3/i)).toBeInTheDocument();
  });
  it("remove a pane with toolbar", async () => {
    render(<AccordionMain layoutState={testLayout} setProp={() => {}} />);
    const removePane = screen.getByTestId("RemoveIcon");
    // Pane 1 accordionindex is at index 0
    const pane1 = screen.getByRole("button", {
      name: /Pane 1/i,
    });
    expect(pane1).toHaveAttribute("accordionindex", "0");
    // Click Remove Icon button
    fireEvent.click(pane1);
    fireEvent.click(removePane);
    // Pane 2 accordionIndex is now at index 0
    const pane2 = await screen.findByRole("button", {
      name: /Pane 2/i,
    });
    expect(pane2).toHaveAttribute("accordionindex", "0");
  });
  it("Config buttons work in succession", async () => {
    render(<AccordionMain layoutState={testLayout} setProp={() => {}} />);
    const removePane = screen.getByTestId("RemoveIcon");
    const addPane = screen.getByTestId("AddIcon");
    // Tab 1 activeTab is at index 0
    const pane1 = screen.getByRole("button", {
      name: /Pane 1/i,
    });
    expect(pane1).toHaveAttribute("accordionindex", "0");
    // Click Remove Icon button
    fireEvent.click(pane1);
    fireEvent.click(removePane);
    // Pane 2 accordionIndex is now at index 0
    const pane2 = await screen.findByRole("button", {
      name: /Pane 2/i,
    });
    expect(pane2).toHaveAttribute("accordionindex", "0");
    fireEvent.click(addPane);
    const newPane = await screen.findByRole("button", {
      name: "",
    });
    expect(pane2).toHaveAttribute("accordionindex", "0");
    expect(newPane).toHaveAttribute("accordionindex", "1");
  });
});

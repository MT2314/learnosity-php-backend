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
    title: "",
    placeholderTitle: "Pane 1",
    components: [],
    expanded: true,
  },
  {
    id: 1,
    title: "",
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
describe("Check if toolbar actions work", () => {
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
  //   it("move tab right with toolbar", () => {
  //     render(<TabsMain layoutState={testLayout} setProp={() => {}} />);
  //     const moveRight = screen.getByTestId("ArrowForwardIcon");
  //     const tab = screen.getByPlaceholderText(/Tab 1/i);
  //     expect(tab).toHaveAttribute("activetab", "0");
  //     fireEvent.click(moveRight);
  //     const tab1 = screen.getByPlaceholderText(/Tab 1/i);
  //     expect(tab1).toHaveAttribute("activetab", "1");
  //   });
  //   it("add a new tab with toolbar", async () => {
  //     render(<TabsMain layoutState={testLayout} setProp={() => {}} />);
  //     const addTab = screen.getByTestId("AddIcon");
  //     fireEvent.click(addTab);
  //     expect(screen.getByText(/Tab 3/i)).toBeInTheDocument();
  //   });
  //   it("remove a tab with toolbar", async () => {
  //     // Add another tab to the state
  //     const newState = produce(testLayout, (draft) => {
  //       draft.push({
  //         id: 2,
  //         title: "Tab 3",
  //         placeholder: "Tab 3",
  //         components: [],
  //         activeTab: false,
  //       });
  //     });
  //     render(<TabsMain layoutState={newState} setProp={() => {}} />);
  //     // Tab 1 activeTab is at index 0
  //     const tab1 = screen.getByPlaceholderText(/Tab 1/i);
  //     expect(tab1).toHaveAttribute("activetab", "0");
  //     // Click Remove Icon button
  //     const removeTab = screen.getByTestId("RemoveIcon");
  //     await fireEvent.click(removeTab);
  //     // Tab 2 activeTab is at index 0
  //     const tab2 = screen.getByPlaceholderText(/Tab 2/i);
  //     expect(tab2).toHaveAttribute("activetab", "0");
  //   });
  //   it("Config buttons work in succession", async () => {
  //     // Click Add Tab Icon button
  //     render(<TabsMain layoutState={testLayout} setProp={() => {}} />);
  //     const addTab = screen.getByTestId("AddIcon");
  //     fireEvent.click(addTab);
  //     // Tab 1 activeTab is at index 0
  //     const tab1 = screen.getByPlaceholderText(/Tab 1/i);
  //     expect(tab1).toHaveAttribute("activetab", "0");
  //     // Click Remove Tab Icon button
  //     const removeTab = screen.getByTestId("RemoveIcon");
  //     await fireEvent.click(removeTab);
  //     // Tab 2 activeTab is at index 0
  //     const tab2 = screen.getByPlaceholderText(/Tab 2/i);
  //     expect(tab2).toHaveAttribute("activetab", "0");
  //   });
});

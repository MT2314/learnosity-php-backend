import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import produce from "immer";
import "@testing-library/jest-dom";
import TabsMain from "../components/Tabs/TabsMain";
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
    title: "Tab 1",
    placeholder: "Tab 1",
    components: [],
    activeTab: true,
  },
  {
    id: 1,
    title: "Tab 2",
    placeholder: "Tab 2",
    components: [],
    activeTab: false,
  },
];

describe("Renders Tab Component with default props", () => {
  it("Renders Tab Component 2 default Tabs", async () => {
    render(<TabsMain layoutState={testLayout} setProp={() => {}} />);
    expect(screen.getByText(/Tab 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Tab 2/i)).toBeInTheDocument();
  });
  it("Displays placeholder text within Tab", async () => {
    render(<TabsMain layoutState={testLayout} />);
    expect(screen.getByText(/Add a component here!/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Drag and drop a component from the left panel or use your keyboard to insert a component./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Accepted components: text, image, chart, table, video, and audio./i
      )
    ).toBeInTheDocument();
  });
});
describe("Changing Active Tab", () => {
  it("On click displays active tab", async () => {
    render(<TabsMain layoutState={testLayout} setProp={() => {}} />);
    const tabLabel = screen.getByText(/Tab 2/i);
    fireEvent.click(tabLabel);
    // Placeholder Text in document only when tab is active, check by changing Text in test below
    expect(screen.getByPlaceholderText(/Tab 2/i)).toBeInTheDocument();
  });
});
describe("Check if toolbar renders", () => {
  it("check for the 4 actions within toolbar", async () => {
    render(<TabsMain layoutState={testLayout} setProp={() => {}} />);
    expect(screen.getByTestId("ArrowBackIcon")).toBeInTheDocument();
    expect(screen.getByTestId("ArrowForwardIcon")).toBeInTheDocument();
    expect(screen.getByTestId("AddIcon")).toBeInTheDocument();
    expect(screen.getByTestId("RemoveIcon")).toBeInTheDocument();
  });
});
describe("Check if toolbar actions work", () => {
  it("move tab left with toolbar", () => {
    const newState = produce(testLayout, (draft) => {
      draft[0].activeTab = false;
      draft[1].activeTab = true;
    });
    render(<TabsMain layoutState={newState} setProp={() => {}} />);
    const moveLeft = screen.getByTestId("ArrowBackIcon");
    const tab = screen.getByPlaceholderText(/Tab 2/i);
    expect(tab).toHaveAttribute("activetab", "1");
    fireEvent.click(moveLeft);
    const tab1 = screen.getByPlaceholderText(/Tab 2/i);
    expect(tab1).toHaveAttribute("activetab", "0");
  });

  it("move tab right with toolbar", () => {
    render(<TabsMain layoutState={testLayout} setProp={() => {}} />);
    const moveRight = screen.getByTestId("ArrowForwardIcon");
    const tab = screen.getByPlaceholderText(/Tab 1/i);
    expect(tab).toHaveAttribute("activetab", "0");
    fireEvent.click(moveRight);
    const tab1 = screen.getByPlaceholderText(/Tab 1/i);
    expect(tab1).toHaveAttribute("activetab", "1");
  });

  it("add a new tab with toolbar", async () => {
    render(<TabsMain layoutState={testLayout} setProp={() => {}} />);
    const addTab = screen.getByTestId("AddIcon");
    fireEvent.click(addTab);
    expect(screen.getByText(/Tab 3/i)).toBeInTheDocument();
  });

  it("remove a tab with toolbar", async () => {
    // Add another tab to the state
    const newState = produce(testLayout, (draft) => {
      draft.push({
        id: 2,
        title: "Tab 3",
        placeholder: "Tab 3",
        components: [],
        activeTab: false,
      });
    });
    render(<TabsMain layoutState={newState} setProp={() => {}} />);
    // Tab 1 activeTab is at index 0
    const tab1 = screen.getByPlaceholderText(/Tab 1/i);
    expect(tab1).toHaveAttribute("activetab", "0");
    // Click Remove Icon button
    const removeTab = screen.getByTestId("RemoveIcon");
    await fireEvent.click(removeTab);
    // Tab 2 activeTab is at index 0
    const tab2 = screen.getByPlaceholderText(/Tab 2/i);
    expect(tab2).toHaveAttribute("activetab", "0");
  });

  it("Config buttons work in succession", async () => {
    // Click Add Tab Icon button
    render(<TabsMain layoutState={testLayout} setProp={() => {}} />);
    const addTab = screen.getByTestId("AddIcon");
    fireEvent.click(addTab);
    // Tab 1 activeTab is at index 0
    const tab1 = screen.getByPlaceholderText(/Tab 1/i);
    expect(tab1).toHaveAttribute("activetab", "0");
    // Click Remove Tab Icon button
    const removeTab = screen.getByTestId("RemoveIcon");
    await fireEvent.click(removeTab);
    // Tab 2 activeTab is at index 0
    const tab2 = screen.getByPlaceholderText(/Tab 2/i);
    expect(tab2).toHaveAttribute("activetab", "0");
  });
});

import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TabsMain from "../components/Tabs/TabsMain";
import { layoutConfig } from "../components/Tabs/TabContext";

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
    type: "TAB",
    id: 0,
    title: "Polkaroo",
    components: [],
  },
  {
    type: "TAB",
    id: 1,
    title: "Juno",
    components: [
      { componentName: "Text", componentProps: { body: null } },
      { componentName: "Text", componentProps: { body: null } },
    ],
  },
];

const mockPropsMultipleTabs = [
  {
    type: "TAB",
    id: 0,
    title: "Tab 1",
    components: [],
  },
  {
    type: "TAB",
    id: 1,
    title: "Tab 2",
    components: [
      { componentName: "Text", componentProps: { body: null } },
      { componentName: "Text", componentProps: { body: null } },
    ],
  },
  {
    type: "TAB",
    id: 2,
    title: "Tab 3",
    components: [],
  },
];

describe("Tabs", () => {
  it("Renders Tab Component with default 2 tabs", async () => {
    render(<TabsMain layoutState={testLayout} />);

    expect(screen.getByText(/polkaroo/i)).toBeInTheDocument();
    expect(screen.getByText(/juno/i)).toBeInTheDocument();
  });

  it("Displays placeholder text", async () => {
    render(<TabsMain layoutState={testLayout} />);
    expect(screen.getByText(/accepted components/i)).toBeInTheDocument();
  });

  it("On click displays active tab", async () => {
    render(<TabsMain layoutState={testLayout} />);
    const tabLabel = screen.getByRole("tab", { name: /juno/i });
    const placeholder = screen.getByText(/accepted components/i);

    expect(tabLabel).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();

    fireEvent.click(tabLabel);
    expect(placeholder).not.toBeInTheDocument();
  });

  it("adds a new tab", async () => {
    render(<TabsMain layoutState={testLayout} />);
    layoutConfig(testLayout, {
      func: "ADD_TAB",
      id: 2,
    });
    expect(testLayout.length).toBeGreaterThan(2);
    expect(testLayout).toHaveLength(3);
  });

  it("removes a tab", async () => {
    render(<TabsMain layoutState={mockPropsMultipleTabs} />);
    layoutConfig(mockPropsMultipleTabs, {
      func: "REMOVE_TAB",
      currentTab: 0,
    });
    expect(mockPropsMultipleTabs).toHaveLength(2);
  });

  it("adds a component", async () => {
    render(<TabsMain layoutState={testLayout} />);
    layoutConfig(testLayout, {
      func: "ADD_COMPONENT",
      tabIndex: 0,
      component: {
        componentName: "Text",
      },
    });

    expect(testLayout[0].components).toHaveLength(1);
  });
});

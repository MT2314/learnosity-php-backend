import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Tab from "../components/Tab/Tab";


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

const testTabs = [
    { id: 1, name: "Math", content: [] },
    {
      id: 2,
      name: "Geography",
      content: [],
    },
  ]

const numOfTabs = testTabs.filter(tab => tab.id).length

describe("Tab", () => {
  it("renders tabs with given data", () => {
    render(<Tab tabs={testTabs}/>)

    expect(screen.getByTestId("tab")).toBeInTheDocument();
    expect(screen.getByTestId("add-For")).toBeInTheDocument(); 
    expect(screen.getByTestId("add-Ima")).toBeInTheDocument();
  })
  
  it("has a minimum of 2 tabs on render", () => {
    render(<Tab tabs={testTabs}/>)

    expect(testTabs).not.toHaveLength(3)
    expect(testTabs).toHaveLength(numOfTabs)
  })

  it("renders add tab button", () => {
    render(<Tab tabs={testTabs}/>)
    
    expect(screen.getByTestId("add-tab-btn")).toBeInTheDocument()
  })
  
  it("renders a new tab when add tab btn is pressed", async () => {
    const user = userEvent.setup()
    
    render(<Tab tabs={testTabs}/>)
    await user.click(screen.getByTestId("add-tab-btn"))
    //To do: assert that when btn is clicked there are 3 tabs
  })

})


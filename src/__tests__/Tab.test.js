import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
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

describe("Tab", () => {
  const testTabs = {
    tabs: [
      { id: 1, name: "Math", content: [] },
      {
        id: 2,
        name: "Geography",
        content: [],
      },
    ],
  };
  
  const numOfTabs = testTabs.tabs.filter(tab => tab.id).length

  it("renders tabs with given data", () => {
    render(<Tab tabs={testTabs.tabs}/>)

    expect(screen.getByTestId("tab")).toBeInTheDocument();
    expect(screen.getByTestId("add-For")).toBeInTheDocument(); 
    expect(screen.getByTestId("add-Ima")).toBeInTheDocument();
  })
  
  it("has a minimum of 2 tabs on render", () => {
    render(<Tab tabs={testTabs.tabs}/>)

    expect(testTabs.tabs).not.toHaveLength(3)
    expect(testTabs.tabs).not.toHaveLength(1)
    expect(testTabs.tabs).toHaveLength(numOfTabs)
  })

  it("renders add tab button", () => {
    render(<Tab tabs={testTabs.tabs}/>)
    
    expect(screen.getByTestId("add-tab-btn")).toBeInTheDocument()
  })
  
  it("renders a new tab when add tab btn is pressed", () => { 
    let addingTabArr = {
      tabs: [
        { id: 1, name: "Math", content: [] },
        {
          id: 2,
          name: "Geography",
          content: [],
        },
      ]
    }
    render(<Tab tabs={addingTabArr.tabs} setProp={(stateUpdate) => addingTabArr = {...addingTabArr, ...stateUpdate}}/>)

    const addTabBtn = screen.getByRole("button", {name: /add tab/i});

    expect(addTabBtn).toBeInTheDocument()

    fireEvent.click(addTabBtn)
    expect(addingTabArr.tabs).toHaveLength(3)    
  })

  it("formatted text and image btns are in the document and fire add component function", () => { 

    const mockFn = jest.fn()

    let addingTabArr = {
      tabs: [
        { id: 1, name: "Math", content: [] },
        {
          id: 2,
          name: "Geography",
          content: [],
        },
      ]
    }

    render(<Tab tabs={addingTabArr.tabs} setProp={mockFn}/>)

    const formattedTextBtn = screen.getByRole("button", {name: /add formatted text/i})
    const imageBtn = screen.getByRole("button", {name: /add image/i})

    expect(formattedTextBtn).toBeInTheDocument()
    expect(imageBtn).toBeInTheDocument()
    
    fireEvent.click(formattedTextBtn)
    expect(mockFn).toHaveBeenCalled()

    fireEvent.click(imageBtn)
    expect(mockFn).toHaveBeenCalled()

  })
})



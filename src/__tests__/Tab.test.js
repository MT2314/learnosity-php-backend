import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TabsMain from "../components/Tabs/TabsMain";

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

  xit("renders tabs with given data", () => {
    render(<TabsMain tabs={testTabs.tabs}/>)

    expect(screen.getByTestId("tab")).toBeInTheDocument();
    expect(screen.getByTestId("add-For")).toBeInTheDocument(); 
    expect(screen.getByTestId("add-Ima")).toBeInTheDocument();
  })
  
  xit("has a minimum of 2 tabs on render", () => {
    render(<TabsMain tabs={testTabs.tabs}/>)

    expect(testTabs.tabs).not.toHaveLength(3)
    expect(testTabs.tabs).not.toHaveLength(1)
    expect(testTabs.tabs).toHaveLength(numOfTabs)
  })

  xit("renders add tab button", () => {
    render(<TabsMain tabs={testTabs.tabs}/>)
    
    expect(screen.getByTestId("add-tab-btn")).toBeInTheDocument()
  })
  
  xit("renders a new tab when add tab btn is pressed", () => { 
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
    render(<TabsMain tabs={addingTabArr.tabs} setProp={(stateUpdate) => addingTabArr = {...addingTabArr, ...stateUpdate}}/>)

    const addTabBtn = screen.getByRole("button", {name: /add tab/i});

    expect(addTabBtn).toBeInTheDocument()

    fireEvent.click(addTabBtn)
    expect(addingTabArr.tabs).toHaveLength(3)    
  })

  xit("formatted text and image btns are in the document and fire add component function", () => { 

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

    render(<TabsMain tabs={addingTabArr.tabs} setProp={mockFn}/>)

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



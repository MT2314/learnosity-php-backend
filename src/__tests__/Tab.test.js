import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { findByText, fireEvent, getByRole, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TabsMain, { ActiveTabProvider } from "../components/Tabs/TabsMain";
import { LayoutProvider, TabContext } from "../components/Tabs/TabsMain"
import Tabs from "../components/Tabs/subcomponents/Tabs";

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

describe("Tabs", () => {
  const TestLayout = [
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
        components: [],
      },
    ]

  it("renders tab component with two tabs", async () => {
    render(
      <LayoutProvider layoutState={TestLayout} setProp={() => { console.log("set props function")}}>
        <ActiveTabProvider>
          <Tabs/>
        </ActiveTabProvider>
      </LayoutProvider>
    )

    await waitFor(() => {
      expect(screen.getByRole('button', {name: /polkaroo/ig})).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByRole('button', {name:/juno/ig})).toBeInTheDocument()
    })
  })
  
  // xit("has a minimum of 2 tabs on render", () => {
  //   render(<TabsMain tabs={layoutState}/>)

  //   expect(layoutState).not.toHaveLength(3)
  //   expect(layoutState).not.toHaveLength(1)
  //   expect(layoutState).toHaveLength(numOfTabs)
  // })

  
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



import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

// //added from Sam's nav unit test
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),

  useLocation: () => ({
    pathname: "localhost:3001",
  }),
}));

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


describe("Tab", () => {

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
  
  test("renders a new tab when add tab btn is pressed", async () => {
    
    render(<Tab tabs={testTabs.tabs}/>)

    const addTabBtn = screen.getByRole("button", {name: /add tab/i});

    expect(addTabBtn).toBeInTheDocument()

    await userEvent.click(addTabBtn);
    const newTab = screen.getByTestId("tab-3");
    expect(newTab).toBeInTheDocument()

    // userEvent.click(addTabBtn)
    // await waitFor(() => 
    //   expect(testTabs.tabs)
    // )
    //userEvent.click(screen.getByTestId("add-tab-btn"))
    //To do: assert that when btn is clicked there are 3 tabs

    //expect(testTabs.tabs).not.toHaveLength(2)
    //expect(screen.getByRole("button", { name: /tab 2/i})).toBeInTheDocument()
  })
})



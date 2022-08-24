import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LayoutProvider, ActiveTabProvider } from "../components/Tabs/TabContext";
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
    components: [],
  },
];

describe("Tabs", () => {
   it('Renders Tab Component', async () => {
    render(
      <DndProvider backend={HTML5Backend}>
      <LayoutProvider layoutState={testLayout} setProp={()=>{}}>
        <ActiveTabProvider>
          <Tabs />
        </ActiveTabProvider>
      </LayoutProvider>
    </DndProvider>
    )

      expect(screen.getByText(/polkaroo/ig)).toBeInTheDocument();
      expect(screen.getByText(/juno/ig)).toBeInTheDocument();
   }) 
  // it("renders tab component with two tabs, saved titles", async () => {
  //   render(<TabsMain layoutState={testLayout} />);

  //   await waitFor(() => {
  //     expect(screen.getByText(/Polkaroo/gi)).toBeInTheDocument();
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText(/Juno/gi)).toBeInTheDocument();
  //   });
  // });

  // it("renders the tab component with placeholder text if no components are added tab", async () => {
  //   render(<TabsMain layoutState={testLayout} />);

  //   await waitFor(() => {
  //     expect(screen.getByText(/add a component here/gi)).toBeInTheDocument();
  //   });
  // });
});

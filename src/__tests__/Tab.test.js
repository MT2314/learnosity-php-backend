import React, {useContext} from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LayoutProvider, ActiveTabProvider, TabContext } from "../components/Tabs/TabContext";
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
    components: [{"componentName":"Text","componentProps":{"body":null}},{"componentName":"Text","componentProps":{"body":null}}]
  },
];

const TestTab = () => (
      <DndProvider backend={HTML5Backend}>
      <LayoutProvider layoutState={testLayout} setProp={()=>{}}>
        <ActiveTabProvider>
          <Tabs />
        </ActiveTabProvider>
      </LayoutProvider>
    </DndProvider>
)

describe("Tabs", () => {
   it('Renders Tab Component with default 2 tabs', async () => {
    render(<TestTab/>)

      expect(screen.getByText(/polkaroo/ig)).toBeInTheDocument();
      expect(screen.getByText(/juno/ig)).toBeInTheDocument();
   }) 

   it('Displays placeholder text', async () => {
    render(<TestTab/>)
    expect(screen.getByText(/accepted components/ig)).toBeInTheDocument();
   })

   it('On click activates tab', async () => {
    render(<TestTab/>)
      const tabLabel = screen.getByRole('tab', {name:/juno/ig});
      const placeholder = screen.getByText(/accepted components/ig)
      
      expect(tabLabel).toBeInTheDocument();
      expect(placeholder).toBeInTheDocument();

      fireEvent.click(tabLabel);
      expect(placeholder).not.toBeInTheDocument();

      
      
   })
});

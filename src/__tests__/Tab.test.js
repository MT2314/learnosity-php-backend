import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, waitFor } from "@testing-library/react";
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
  it("renders tab component with two tabs, saved titles", async () => {
    render(<TabsMain layoutState={testLayout} />);

    await waitFor(() => {
      expect(screen.getByText(/Polkaroo/gi)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Juno/gi)).toBeInTheDocument();
    });
  });

  it("renders the tab component with placeholder text if no components are added tab", async () => {
    render(<TabsMain layoutState={testLayout} />);

    await waitFor(() => {
      expect(screen.getByText(/add a component here/gi)).toBeInTheDocument();
    });
  });
});

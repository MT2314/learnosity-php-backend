import React from "react";
import { render, screen } from "@testing-library/react";

import { unmountComponentAtNode } from "react-dom";
import userEvent from "@testing-library/user-event";
import Callout from "../components/Callout/Callout";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const testProps = {
  name: "Callout",
  calloutTypeSvg: {
    blocks: [
      {
        key: "d3ktl",
        text: "www.tvo.org",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  },
  calloutTitle: {
    blocks: [
      {
        key: "title1",
        text: "Definition",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  },
  calloutBody: {
    blocks: [
      {
        key: "calloutText2",
        text: "Hi this is my callout body!",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  },
};

describe("<Callout />", () => {
  it("renders Callout component", () => {
    expect(render(<Callout />)).toBeDefined();
  });

  it("renders QuoteBox without any given data", () => {
    render(<Callout />);

    expect(screen.getByTestId("callout")).toBeInTheDocument();
    expect(screen.getByTestId("calloutIconUrl")).toBeInTheDocument();
    expect(screen.getByTestId("calloutBody")).toBeInTheDocument();
    expect(screen.getByTestId("calloutTitle")).toBeInTheDocument();
  });

  it("renders QuoteBox with given data", () => {
    render(
      <Callout
        quoteBoxBody={testProps.quoteBoxBody}
        quoteBoxCitation={testProps.quoteBoxCitation}
      />
    );

    expect(screen.getByTestId("callout")).toHaveTextContent("Polkaroo");
    expect(screen.getByTestId("calloutBody")).not.toHaveTextContent("Humpty");
    expect(screen.getByTestId("calloutIconUrl")).toHaveTextContent("Bibble");
    expect(screen.getByTestId("calloutTitle")).not.toHaveTextContent("Dumpty");
  });

  it("renders options in dropdown", () => {
    render(<Callout />);

    userEvent.click(screen.getByLabelText(`Callout Type`));

    expect(screen.getByText("Challenge")).toBeDefined();
    expect(screen.getByText("Notebook")).toBeDefined();
    expect(screen.getByText("Try It")).toBeDefined();
    expect(screen.getByText("Definition")).toBeDefined();

    expect(screen.getByRole("listbox")).toBeDefined();
    expect(screen.getByText("Callout Type:")).toBeDefined();
  });

  it("renders text entry box", () => {
    render(<Callout />);
    expect(screen.getByText("Enter callout body text here...")).toBeDefined();
  });
});

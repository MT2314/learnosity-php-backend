import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// import userEvent from "@testing-library/user-event";

import Callout from "../components/Callout/Callout";

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

const testProps = {
  name: "Callout",
  calloutTypeSvg: {
    blocks: [
      {
        key: "testSvg",
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

describe("Callout", () => {
  it("renders callout without any given data", () => {
    render(<Callout />);

    expect(screen.getByTestId("callout")).toBeInTheDocument();
    expect(screen.getByTestId("calloutTypeSvg")).toBeInTheDocument();
    expect(screen.getByTestId("calloutBody")).toBeInTheDocument();
    expect(screen.getByTestId("calloutTitle")).toBeInTheDocument();
  });

  it("renders callout with given data", () => {
    render(
      <Callout
        calloutBody={testProps.calloutBody}
        calloutTitle={testProps.calloutTitle}
        calloutIconUrl={testProps.calloutIconUrl}
      />
    );

    expect(screen.getByTestId("callout")).toHaveTextContent(
      "Hi this is my callout body!"
    );
    expect(screen.getByTestId("calloutBody")).not.toHaveTextContent(
      "Thanks for this scaffold Sam!"
    );
    // expect(screen.getByTestId("calloutTypeSvg")).toHaveTextContent(
    //   "www.tvo.org"
    // );
    expect(screen.getByTestId("calloutTitle")).not.toHaveTextContent("123");
    expect(screen.getByTestId("calloutTitle")).toHaveTextContent("Definition");
  });

  it("renders options in dropdown", () => {
    render(<Callout />);

    // userEvent.click(screen.getByLabelText(`Callout Type`));
    // userEvent.click(screen.getAllByRole("listbox")).toBeDefined();

    expect(screen.getByText("Callout Type:")).toBeDefined();
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

describe("Callout, French and English:", () => {
  it("Renders Callout in French, then renders in English after click", () => {
    render(<Callout />);

    const frenchButton = screen.getByRole("button", { name: "French" });

    expect(frenchButton).toBeInTheDocument();

    fireEvent.click(frenchButton);

    expect(screen.getByText("Type de légende :")).toBeInTheDocument();
    expect(screen.getByText("Sélectionnez la valeur")).toBeInTheDocument();
    expect(
      screen.getByText("Entrez le corps du texte de la légende ici...")
    ).toBeInTheDocument();

    expect(frenchButton).toBeDisabled();

    const englishButton = screen.getByRole("button", { name: "English" });

    fireEvent.click(englishButton);

    expect(screen.getByText("Callout Type:")).toBeInTheDocument();
    expect(screen.getByText("Select Value")).toBeInTheDocument();
    expect(
      screen.getByText("Enter callout body text here...")
    ).toBeInTheDocument();

    expect(englishButton).toBeDisabled();
  });
});

import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

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
  calloutTypeSvg:
    "https://s3.ca-central-1.amazonaws.com/ilc.tvo.org/ets4u/assets/img/challenge_icon.svg",
  calloutTitle: "Challenge",
  calloutBody: {
    blocks: [
      {
        key: "2ga6c",
        text: "Polkaroo was a great television show",
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

xdescribe("Callout (English)", () => {
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
      "Polkaroo was a great television show"
    );
    expect(screen.getByTestId("calloutBody")).not.toHaveTextContent(
      "Thanks for this scaffold Sam!"
    );
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

xdescribe("Callout, French and English:", () => {
  it("Renders Callout in French, then renders in English after click", () => {
    render(<Callout />);

    const frenchButton = screen.getByRole("button", { name: "French" });

    expect(frenchButton).toBeInTheDocument();

    fireEvent.click(frenchButton);

    expect(screen.getByText("Type de l??gende :")).toBeInTheDocument();
    expect(screen.getByText("S??lectionnez la valeur")).toBeInTheDocument();
    expect(
      screen.getByText("Entrez le corps du texte de la l??gende ici...")
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

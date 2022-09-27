import React, { useReducer } from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InfoBox from "../components/InfoBox/InfoBox";
import produce from "immer";

import { infoBoxConfig } from "../components/InfoBox/InfoBoxContext";

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

export const defaultProps = {
  infoBoxIcon: null,
  infoBoxLabel: "",
  infoBoxHeader: {
    heading: "",
    headingLevel: "3",
  },
  body: null,
};

describe("Info Box, placeholder data. Test Rendering.", () => {
  it("Renders Info Box Component, with placeholder data", async () => {
    render(<InfoBox layoutState={defaultProps} />);
  });
  it("Renders Label, with placeholder data", async () => {
    render(<InfoBox layoutState={defaultProps} />);
    expect(
      screen.getByPlaceholderText(/Type your label here/i)
    ).toBeInTheDocument();
  });
  it("Renders Header, with placeholder data", async () => {
    render(<InfoBox layoutState={defaultProps} />);
    expect(
      screen.getByPlaceholderText(/Type your header here/i)
    ).toBeInTheDocument();
  });
  it("Renders Icon, with placeholder data", async () => {
    render(<InfoBox layoutState={defaultProps} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("data-icon", "");
  });
});
describe("Info Box, test reducers. Rendering props.", () => {
  it("Update Icon", async () => {
    const newIcon = "Challenge";
    const newState = produce(defaultProps, (draft) => {
      draft.infoBoxIcon = newIcon;
    });
    render(<InfoBox infoBoxState={newState} />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("data-icon", "Challenge");
  });
  it("Update Label", async () => {
    const newLabel = "Polkaroo Label";
    const newState = produce(defaultProps, (draft) => {
      draft.infoBoxLabel = newLabel;
    });
    render(<InfoBox infoBoxState={newState} />);

    expect(screen.getByDisplayValue("Polkaroo Label")).toBeInTheDocument();
  });
  it("Update Header", async () => {
    const newHeader = "Polkaroo Header";
    const newState = produce(defaultProps, (draft) => {
      draft.infoBoxHeader.heading = newHeader;
    });
    render(<InfoBox infoBoxState={newState} />);

    expect(screen.getByDisplayValue("Polkaroo Header")).toBeInTheDocument();
  });
  it("Update Body", async () => {
    const newBody = {
      ops: [
        {
          insert: "Polkaroo Body\n",
        },
      ],
    };
    const newState = produce(defaultProps, (draft) => {
      draft.body = newBody;
    });
    render(<InfoBox infoBoxState={newState} />);

    expect(screen.getByText(/Polkaroo Body/i)).toBeInTheDocument();
  });
});

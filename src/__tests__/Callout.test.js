import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Callout from "../components/Callout/Callout";

describe("<Callout />", () => {
  it("renders Callout component", () => {
    expect(render(<Callout />)).toBeDefined();
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
    expect(screen.getByText("Enter callout body text here...")).toBeDefined();
  });

  it("renders text entry box", () => {
    render(<Callout />);
    //  expect(
    //    screen.getByPlaceholderText("Enter callout body text here...")
    //  ).toBeInTheDocument();
  });
});

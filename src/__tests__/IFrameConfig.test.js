import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import IFrameConfig from "../components/IFrame/IFrameConfig";

// Setup/teardown
// https://reactjs.org/docs/testing-recipes.html#setup--teardown
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

describe("IFrameConfig", () => {
  // Test that IFrameConfig component renders when no data saved
  it("renders IFrameConfig without any given data", () => {
    render(<IFrameConfig />);

    expect(screen.getByTestId("iFrameConfigContainer")).toBeInTheDocument();
    expect(
      screen.getByLabelText("iFrame Title (optional):")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Content to be displayed in iFrame (URL):")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("iFrame Height:")).toBeInTheDocument();
    expect(screen.getByLabelText("iFrame Width:")).toBeInTheDocument();
  });

  // Test that iFrame component renders when data provided
  it("renders IFrameConfig with given data", () => {
    // Data is located in "componentState" in IFrameConfig.js
    render(<IFrameConfig />);

    const titleInput = screen.getByRole("textbox", {
      name: "iFrame Title (required):",
    });
    expect(titleInput).toHaveDisplayValue("Weighted Response Quiz");
    expect(titleInput).not.toHaveDisplayValue("Sorting Table");

    const urlInput = screen.getByRole("textbox", {
      name: "Content to be displayed in iFrame (URL):",
    });
    expect(urlInput).not.toHaveValue("https://www.tvo.org");
    expect(urlInput).toHaveValue(
      "https://digital-learning-ilos.s3.ca-central-1.amazonaws.com/showcase/lessons/quiz.html"
    );

    const heightInput = screen.getByLabelText("iFrame Height:");
    expect(heightInput).not.toHaveDisplayValue("1000");
    expect(heightInput).toHaveDisplayValue("800");

    const widthInput = screen.getByLabelText("iFrame Width:");
    expect(widthInput).toHaveDisplayValue("100");
  });
});

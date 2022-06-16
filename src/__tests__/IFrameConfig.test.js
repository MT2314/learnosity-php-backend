import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

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
      screen.getByLabelText("iFrame Title (required):")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Content to be displayed in iFrame (URL):")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Height (px):")).toBeInTheDocument();
    expect(screen.getByLabelText("Width:")).toBeInTheDocument();
  });

  // Test that iFrame component renders when data provided
  it("renders IFrameConfig with given data", async () => {
    render(
      <IFrameConfig
        componentState={{
          url: "https://digital-learning-ilos.s3.ca-central-1.amazonaws.com/showcase/lessons/quiz.html",
        }}
      />
    );

    const titleInput = screen.getByRole("textbox", {
      name: "iFrame Title (required):",
    });
    expect(titleInput).toHaveDisplayValue("Weighted Response Quiz");
    expect(titleInput).not.toHaveDisplayValue("Sorting Table");

    const urlInput = screen.getByRole("textbox", {
      name: "Content to be displayed in iFrame (URL):",
    });
    expect(urlInput).toBeInTheDocument();
    expect(urlInput).not.toHaveValue("https://www.tvo.org");
    const user = userEvent.setup();
    await user.type(
      urlInput,
      "https://digital-learning-ilos.s3.ca-central-1.amazonaws.com/showcase/lessons/quiz.html"
    );
    expect(urlInput).toHaveDisplayValue(
      "https://digital-learning-ilos.s3.ca-central-1.amazonaws.com/showcase/lessons/quiz.html"
    );

    const heightInput = screen.getByLabelText("Height (px):");
    expect(heightInput).not.toHaveDisplayValue("1000");
    expect(heightInput).toHaveDisplayValue("500");

    const widthInput = screen.getByLabelText("Width:");
    expect(widthInput).not.toHaveDisplayValue("550");
    expect(widthInput).toHaveDisplayValue("900");
  });
});

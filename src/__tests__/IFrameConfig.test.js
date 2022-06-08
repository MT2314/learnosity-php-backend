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

// Mock data
const mockData = {
  title: "Weighted Response Quiz",
  src: "https://digital-learning-ilos.s3.ca-central-1.amazonaws.com/showcase/lessons/quiz.html",
  height: "500",
  width: "500",
  heightType: "px",
  widthType: "%",
};

describe("IFrameConfig", () => {
  // Test that IFrame component renders when no data saved
  it("renders IFrame without any given data", () => {
    render(<IFrameConfig />);

    expect(screen.getByTestId("iFrameConfigContainer")).toBeInTheDocument();
    expect(screen.getByLabelText("iFrame Title:")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Content to be displayed in iFrame (URL):")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("iFrame Height:")).toBeInTheDocument();
    expect(screen.getByLabelText("iFrame Width:")).toBeInTheDocument();
  });

  // Test that iFrame component renders when data provided
  it("renders IFrameConfig with given data", () => {
    render(
      <IFrameConfig
        title={mockData.title}
        src={mockData.src}
        height={mockData.height}
        width={mockData.width}
        heightType={mockData.heightType}
        widthType={mockData.widthType}
      />
    );

    expect(screen.getByLabelText("iFrame Title:")).not.toHaveDisplayValue(
      "Sorting Table"
    );
    expect(screen.getByLabelText("iFrame Title:")).toHaveDisplayValue(
      "Weighted Response Quiz"
    );
    expect(screen.getByTestId("iFrameConfigSrc")).not.toHaveValue(
      "https://www.tvo.org"
    );
    expect(screen.getByTestId("iFrameConfigSrc")).toHaveValue(
      "https://digital-learning-ilos.s3.ca-central-1.amazonaws.com/showcase/lessons/quiz.html"
    );
    expect(screen.getByLabelText("iFrame Height:")).not.toHaveDisplayValue(
      "1000"
    );
    expect(screen.getByLabelText("iFrame Height:")).toHaveDisplayValue("500");
    expect(screen.getByLabelText("iFrame Width:")).not.toHaveDisplayValue(
      "1000"
    );
    expect(screen.getByLabelText("iFrame Width:")).toHaveDisplayValue("500");
  });
});

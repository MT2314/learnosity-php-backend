import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import IFrame from "../components/IFrame/IFrame";

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
  title: "Content Cabinet",
  src: "https://digital-learning-ilos.s3.ca-central-1.amazonaws.com/showcase/lessons/content-cabinet.html",
  height: "500",
  width: "500",
  heightType: "px",
  widthType: "px",
};

describe("IFrame", () => {
  // Test that IFrame component renders when no data saved
  it("renders IFrame without any given data", () => {
    render(<IFrame />);

    expect(screen.getByTestId("iFrameContainer")).toBeInTheDocument();
    expect(screen.getByText("iFrame Title")).toBeInTheDocument();
    expect(screen.getByTestId("iFramePlaceholder")).toBeInTheDocument();
  });

  // Test that iFrame component renders when data provided
  it("renders Video with given data", () => {
    render(
      <IFrame
        title={mockData.title}
        src={mockData.src}
        height={mockData.height}
        width={mockData.width}
        heightType={mockData.heightType}
        widthType={mockData.widthType}
      />
    );

    expect(screen.getByText("Content Cabinet")).toBeInTheDocument();
    expect(screen.queryByText("Sorting Table")).not.toBeInTheDocument();
    expect(screen.getByTestId("iFrame")).toBeInTheDocument();
    expect(screen.getByTestId("iFrame")).not.toHaveStyle(" height: 100px ");
    expect(screen.getByTestId("iFrame")).toHaveStyle(" height: 500px ");
    expect(screen.getByTestId("iFrame")).not.toHaveStyle(" width: 100px ");
    expect(screen.getByTestId("iFrame")).toHaveStyle(" width: 500px ");
  });
});

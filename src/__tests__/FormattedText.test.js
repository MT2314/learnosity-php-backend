import React from "react";
// import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// import { act } from "react-dom/test-utils";
import { WidgetContextProvider } from "../Utility/mockWrapper";

import FormattedText from "../components/FormattedText";

describe("<FormattedText />", () => {
  const TestComponent = () => {
    return (
      <WidgetContextProvider>
        <FormattedText />
      </WidgetContextProvider>
    );
  };

  test("It renders FormattedText component", () => {
    render(<TestComponent />);
  });

  it("FormattedText is defined", () => {
    render(<TestComponent />);
    expect(render(<TestComponent />)).toBeDefined();
  });

  test("Textbox displays", () => {
    render(<TestComponent />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("Strikethrough button displays", () => {
    render(<TestComponent />);
    expect(screen.getByTitle("Strikethrough")).toBeInTheDocument();
  });
});

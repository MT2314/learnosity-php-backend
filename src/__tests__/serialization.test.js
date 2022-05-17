// import React from "react";
// import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// import { act } from "react-dom/test-utils";
import { WidgetContextProvider } from "../Utility/mockWrapper";

import FormattedText from "../components/FormattedText";

const TestComponent = () => {
  return (
    <WidgetContextProvider>
      <FormattedText />
    </WidgetContextProvider>
  );
};
test("renders Callout component", () => {
  render(<TestComponent />);
  //   expect(screen.getByText("")).toBeInTheDocument();
});

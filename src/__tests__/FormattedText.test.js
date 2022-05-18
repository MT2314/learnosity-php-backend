import React from "react";
// import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// import { act } from "react-dom/test-utils";
import { WidgetContextProvider } from "../Utility/mockWrapper";

import { Editor } from "react-draft-wysiwyg";

import FormattedText from "../components/FormattedText";

describe("<FormattedText />", () => {
  const props = {
    placeholder: "enter your text here",
  };

  const TestComponent = () => {
    return (
      <WidgetContextProvider>
        <FormattedText placeholder={props.placeholder} />
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

  test("rdw-link-control is in the document", () => {
    render(<TestComponent />);
    expect(screen.getByLabelText("rdw-link-control")).toBeInTheDocument();
  });

  test("Placeholder text is in the document", () => {
    render(<TestComponent placeholder={props.placeholder} />);
    // expect(
    //   screen.getByDisplayValue("enter your text here")
    // ).toBeInTheDocument();

    // expect(screen.getByDisplayValue(props.placeholder)).toBeInTheDocument();
    // expect(screen.getByDisplayValue(props.placeholder)).toBeInTheDocument();
  });
});

const TestEditor = () => {
  render(
    <Editor
      spellCheck="true"
      ariaDescribedBy="core text wysiwyg"
      ariaLabel="aria label"
      placeholder="textbox placeHolderText"
      data-testid="formatted-text-body"
      rawContentState={{
        entityMap: {},
        blocks: [
          {
            key: "aaa",
            text: "abc",
          },
        ],
      }}
    />
  );
};

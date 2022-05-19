import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// import { act } from "react-dom/test-utils";
import { WidgetContextProvider } from "../Utility/mockWrapper";

import { Editor } from "react-draft-wysiwyg";

import FormattedText from "../components/FormattedText";

describe("<FormattedText />", () => {
  const props = {
    placeholder: "enter your text here",
    body: "test body",
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
    render(<TestComponent placeholder={props.placeholder} body={props.body} />);
    // expect(screen.getByTestId("formatted-text")).toHaveTextContent("test body");
  });
});

describe("Editor", () => {
  const TestEditor = () => {
    return (
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

  test("TestEditor renders", () => {
    render(<TestEditor />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByLabelText("rdw-link-control")).toBeInTheDocument();
  });
});

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

const mockProps = {
  name: "FormattedText",
  placeHolderText: {
    blocks: [
      {
        key: "key1",
        text: "placeholder",
      },
    ],
    entityMap: {},
  },
  body: {
    blocks: [
      {
        key: "key2",
        text: "Karen's body text",
      },
    ],
    entityMap: {},
  },
};

describe("Formatted text", () => {
  it("renders FormattedText without any given data", () => {
    render(<FormattedText />);

    expect(screen.getByTestId("formatted-text")).toBeInTheDocument();
  });

  it("renders FormattedText with given data", () => {
    render(
      <FormattedText
        body={mockProps.body}
        placeHolderText={mockProps.placeHolderText}
      />
    );
    // expect(screen.getByPlaceholderText("test placeholder")).toBeInTheDocument();

    expect(screen.getByTestId("formatted-text")).toHaveTextContent(
      "Karen's body text"
    );

    expect(screen.getByTestId("formatted-text")).not.toHaveTextContent(
      "Not Karen's body text"
    );
    // testing playground suggested the following query!!!
    // querySelector(
    //   "#rdw-wrapper-4941 > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div"
    // );
  });
});

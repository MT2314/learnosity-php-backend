import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Text from "../components/Text/Text";

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

xdescribe("<Text/>", () => {
  test("Text component renders to the page", () => {
    render(<Text />);

    expect(screen.getByTestId("text-component")).toBeInTheDocument();
  });

  test("Default lorem ipsum renders", () => {
    render(<Text />);

    expect(screen.getByText(/Lorem ipsum/i)).toBeInTheDocument();
  });

  test("On click text editor and custom tool bar render", () => {
    render(<Text />);

    const editorContainer = screen.getByTestId("text-component");

    expect(editorContainer).toBeInTheDocument();

    fireEvent.click(editorContainer);

    expect(screen.getByTestId("text-editor-component")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /formatting button dropdown/i })
    ).toBeInTheDocument();
  });

  test("On click bold-drop-down renders", () => {
    render(<Text />);
    const editorContainer = screen.getByTestId("text-component");

    expect(editorContainer).toBeInTheDocument();

    fireEvent.click(editorContainer);

    const boldBtn = screen.getByRole("button", {
      name: /formatting button dropdown/i,
    });
    expect(boldBtn).toBeInTheDocument();

    fireEvent.click(boldBtn);

    expect(screen.getByRole("button", { name: /bold/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /italic/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /underline/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /strike/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sub script/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /super/i })).toBeInTheDocument();
  });

  test("On click align-drop-down renders", () => {
    render(<Text />);

    const editorContainer = screen.getByTestId("text-component");

    expect(editorContainer).toBeInTheDocument();

    fireEvent.click(editorContainer);

    const alignBtn = screen.getByRole("button", {
      name: /alignment buttons dropdown/i,
    });
    expect(alignBtn).toBeInTheDocument();

    fireEvent.click(alignBtn);

    expect(
      screen.getByRole("button", { name: /left align/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /align center/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /right align/i })
    ).toBeInTheDocument();
  });

  test("On click list-drop-down renders", () => {
    render(<Text />);

    const editorContainer = screen.getByTestId("text-component");

    expect(editorContainer).toBeInTheDocument();

    fireEvent.click(editorContainer);

    const listBtn = screen.getByRole("button", {
      name: /list options select group/i,
    });
    expect(listBtn).toBeInTheDocument();

    fireEvent.click(listBtn);

    expect(
      screen.getByRole("button", { name: /numbered list/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /bullet list/i })
    ).toBeInTheDocument();
  });

  test("on click link dropdown renders", () => {
    const mockData = {
      body: {
        ops: [
          { insert: "Normal, " },
          { attributes: { bold: true }, insert: "bold, " },
          { attributes: { italic: true }, insert: "italic," },
          { insert: " " },
          {
            attributes: { underline: true, link: "https://www.google.com" },
            insert: "underline",
          },
          { insert: "\n" },
        ],
      },
    };

    // const user = userEvent.setup();

    render(<Text body={mockData.body} />);

    const quillEditor = screen.getByTestId("text-editor-component");

    expect(quillEditor).toBeInTheDocument();

    // Link button in toolbar displays
    const linkBtn = screen.getByRole("button", {
      name: /add link button/i,
    });
    expect(linkBtn).toBeInTheDocument();

    // Click text that reads "underline" so user can select text to add link to
    const linkedText = screen.getByText("underline");
    expect(linkedText).toBeInTheDocument();
    expect(linkedText).toHaveStyle({ "text-decoration": "underline" });
    fireEvent.click(linkedText);

    // Check pencil/trashcan icon buttons are rendering
    const pencilButton = screen.getByRole("button", { name: "edit link" });
    const trashButton = screen.getByRole("button", { name: "delete link" });
    expect(pencilButton).toBeInTheDocument();
    expect(trashButton).toBeInTheDocument();
  });

  test("Data can be serialized", () => {
    const mockData = {
      body: {
        ops: [
          { insert: "Normal, " },
          { attributes: { bold: true }, insert: "bold, " },
          { attributes: { italic: true }, insert: "italic," },
          { insert: " " },
          { attributes: { underline: true }, insert: "underline" },
          { insert: "\n" },
        ],
      },
    };

    render(<Text body={mockData.body} />);

    const quillEditor = screen.getByTestId("text-editor-component");

    expect(quillEditor).toBeInTheDocument();

    expect(quillEditor).toHaveTextContent("Normal");
    expect(quillEditor).toHaveTextContent("bold");
    expect(quillEditor).toHaveTextContent("italic");
    expect(quillEditor).toHaveTextContent("underline");
    expect(quillEditor).not.toHaveTextContent("Polkaroo");
  });
});

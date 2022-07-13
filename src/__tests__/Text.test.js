import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Text from '../components/Text/Text'

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

describe("<Text/>", () => {
  test('Text component renders to the page', () => {
    render(<Text/>)

    expect(screen.getByTestId('text-component')).toBeInTheDocument()
  })

  test('Default lorem ipsum renders', () => {
    render(<Text/>)

    expect(screen.getByText(/Lorem ipsum/i)).toBeInTheDocument()
  })

  test('On click text editor and custom tool bar render', () => {
    render(<Text/>)

    const editorContainer = screen.getByTestId('text-component')

    expect(editorContainer).toBeInTheDocument()

    fireEvent.click(editorContainer)
    
    expect(screen.getByTestId('text-editor-component')).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /formatting button dropdown/i})).toBeInTheDocument()
  })

  test('On click bold-drop-down renders', () => {
    render(<Text/>)
    const editorContainer = screen.getByTestId('text-component')
    
    expect(editorContainer).toBeInTheDocument()
    
    fireEvent.click(editorContainer)
    
    const boldBtn = screen.getByRole("button", { name: /formatting button dropdown/i})
    expect(boldBtn).toBeInTheDocument()

    fireEvent.click(boldBtn)

    expect(screen.getByRole("button", { name:/bold/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /strike/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sub script/i})).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /super/i})).toBeInTheDocument()

  })

  test('On click align-drop-down renders', () => {
    render(<Text/>)

    const editorContainer = screen.getByTestId('text-component')
    
    expect(editorContainer).toBeInTheDocument()
    
    fireEvent.click(editorContainer)
    
    const alignBtn = screen.getByRole("button", { name: /alignment buttons dropdown/i})
    expect(alignBtn).toBeInTheDocument()

    fireEvent.click(alignBtn)

    expect(screen.getByRole("button", { name:/left align/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /align center/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /right align/i })).toBeInTheDocument()
  })

  test('On click list-drop-down renders', () => {
    render(<Text/>)

    const editorContainer = screen.getByTestId('text-component')
    
    expect(editorContainer).toBeInTheDocument()
    
    fireEvent.click(editorContainer)
    
    const listBtn = screen.getByRole("button", { name: /list options select group/i})
    expect(listBtn).toBeInTheDocument()

    fireEvent.click(listBtn)

    expect(screen.getByRole("button", { name:/numbered list/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument()

  })

})
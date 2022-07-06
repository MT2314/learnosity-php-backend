import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Text from '../components/Text/Text'
import CustomToolBar from "../components/Text/subcomponent/CustomToolBar";

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

  test('On click text editor renders', () => {
    render(<Text/>)

    const editorContainer = screen.getByTestId('text-component')

    expect(editorContainer).toBeInTheDocument()

    fireEvent.click(editorContainer)
    
    expect(screen.getByTestId('text-editor-component')).toBeInTheDocument()
    
  })

  test('On click custom toolbar renders', () => {
    render(<Text/>)

    const editorContainer = screen.getByTestId('text-component')

    expect(editorContainer).toBeInTheDocument()

    fireEvent.click(editorContainer)

    const toolBar = screen.getByRole("button", { name: /formatting button dropdown/i})
    expect(toolBar).toBeInTheDocument()

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
  })

  test('On click list-drop-down renders', () => {
    render(<Text/>)
  })

  test('SetProp function is called when user starts typing', () => {
    render(<Text/>)
  })
})
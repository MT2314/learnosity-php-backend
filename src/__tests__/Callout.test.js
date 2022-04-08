import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Callout from '../Callout/Callout';

describe("<Callout />", () => {

   it('renders Callout component', () => {
      expect(render(<Callout />)).toBeDefined()
   })

   it('renders options in dropdown', () => {
      render( <Callout />)

      userEvent.click(screen.getByLabelText(`Callout Type`));

      expect(screen.getByText("Challenge")).toBeDefined();
      expect(screen.getByText("Notebook")).toBeDefined();
      expect(screen.getByText("Try It")).toBeDefined();
      expect(screen.getByText("Definition")).toBeDefined();

      
   })
})
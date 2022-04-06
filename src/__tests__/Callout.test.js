import React from "react";
import { render, screen } from "@testing-library/react";
import Callout from '../Callout/Callout';

describe("<Callout />", () => {

   it('renders Callout component', () => {
      expect(render(<Callout />)).toBeDefined()
   })
})
import React from "react";
import { render, screen } from "@testing-library/react";
import ImageConfig from "../Image/ImageConfig";
import { ImageProvider } from "../Image/ImageProvider";

describe("<ImageConfig />", () => {

   const testComponent =   
   <>
   <ImageProvider>
      <ImageConfig />
   </ImageProvider>
   </>

   it('renders ImageConfig component', () => {
      expect(render(testComponent)).toBeDefined()
   })

   it('renders label, input and submit btn for img link', () => {
      render(testComponent)

      expect(screen.getByLabelText("Add link to image")).toBeDefined();
      expect(screen.getByPlaceholderText("https://example.com")).toBeDefined();
      expect(screen.getByText("Add Link")).toBeDefined();
   })


   
})
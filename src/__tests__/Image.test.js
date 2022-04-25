import React from "react";
import { render, screen } from "@testing-library/react";
import Image from '../Image/Image';
import { ImageProvider } from "../Image/ImageProvider";


describe("<Image />", () => {

   const testComponent = 
         <>
         <ImageProvider >
            <Image/>
         </ImageProvider>
         </>
   it('renders Image component', () => {
      expect(render(testComponent)).toBeDefined()
   })

   it('renders Caption', () => {
      render(testComponent)

      expect(screen.getByLabelText('Enter caption for image')).toBeDefined();
      expect(screen.getByRole('textbox', {name: "Add caption text to image"})).toBeDefined();
   })
})
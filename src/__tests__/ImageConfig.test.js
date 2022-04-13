import React from "react";
import { render, screen } from "@testing-library/react";
import ImageConfig from "../Image/ImageConfig";
import { ImageProvider } from "../Image/ImageProvider";

describe("<ImageConfig />", () => {

   it('renders ImageConfig component', () => {
      expect(render(
         <>
         <ImageProvider>
            <ImageConfig />
         </ImageProvider>
         </>
      )).toBeDefined()
   })
   
})
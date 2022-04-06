import React from "react";
import { render, screen } from "@testing-library/react";
import Image from '../Image/Image';
import { ImageProvider } from "../Image/ImageProvider";


describe("<Image />", () => {
   it('renders Image component', async () => {
      expect(render(
         <>
         <ImageProvider >
            <Image/>
         </ImageProvider>
         </>
      )).toBeDefined()
   })
})
import React from "react";
import { render, screen } from "@testing-library/react";
import  userEvent  from "@testing-library/user-event"
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
      expect(render(testComponent)).toBeDefined();
   })

   it('Image link renders label, input and submit btn', () => {
      render(testComponent);

      expect(screen.getByText("Add link to image")).toBeDefined();
      expect(screen.getByPlaceholderText("https://example.com")).toBeDefined();
      expect(screen.getByText("Add Link")).toBeDefined();
   })

   it('Image size render drop down options', () => {
      render(testComponent);

      expect(screen.getByText("Default")).toBeDefined();
      expect(screen.getByText("Small")).toBeDefined();
      expect(screen.getByText("Medium")).toBeDefined();
      expect(screen.getByText("Large")).toBeDefined();
   })

   it('Up load button runs onClick event', () => {
      render(testComponent);

      expect(screen.getByText("Upload")).toBeDefined();
      
   })
   
})
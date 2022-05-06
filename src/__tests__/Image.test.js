import React from "react";
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from "@testing-library/react";
import Image from '../components/Image/Image';
import '@testing-library/jest-dom';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

//Mock props/data

const mockProps = {
  imgSize : "small", 
  uploadedImg : "https://www.tvo.org/files/s3fs-public/styles/hero_image/public/media-library/2_3_juno_1.jpg", imgLink : "https://www.tvo.org/files/s3fs-public/styles/hero_image/public/media-library/2_3_juno_1.jpg", 
  alt : "dog", 
  longDesc : "dog dog dog"
}

describe("<Image />", () => {

   it('renders Image component without any given data', () => {
      render(<Image />);

      expect(screen.getByTestId('image-container')).toBeInTheDocument();
      expect(screen.getByTestId('image-placeholder')).toBeInTheDocument();
      expect(screen.getByTestId('image-caption')).toBeInTheDocument();
      expect(screen.getByTestId('image-credit')).toBeInTheDocument();
   })

   it('renders Image component with data', () => {
      render(
         <Image
         imgSize = {mockProps.imgSize}
         uploadedImg = {mockProps.uploadedImg} 
         imgLink = {mockProps.imgLink}
         alt = {mockProps.alt} 
         longDesc = {mockProps.longDesc}
            />
      )

      expect(screen.getByTestId("image")).toHaveAttribute('alt', 'dog')
   })


})
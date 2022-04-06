import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Image } from "../Image/Image";
import { ImageProvider } from "../Image/ImageProvider";


 test('use jsdom in this test file', () => {
   const element = document.createElement('div');
   expect(element).not.toBeNull();
 });

beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "debug").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

test("Renders image component", async () => {
   const component = {
      uuid: "test-key",
      width: 267,
      height: 150,
      url: "https://edcms-media-dev.s3.ca-central-1.amazonaws.com/test.svg",
      altText: "alt",
      caption: "caption",
   };

   const { getByAltText } = await render(
      <ImageProvider>
         <Image
            key={component.uuid}
            uuid={component.uuid}
            publicURI={component.url}
            width={component.width}
            height={component.height}
            alt={component.altText}
            caption={component.caption}
         />
      </ImageProvider>
   );

   // Test caption box
   expect(screen.getByDisplayValue(component.caption)).toBeInTheDocument();

   const image = getByAltText(component.altText);

   expect(image.src).toContain(component.url);

   expect(image).toHaveAttribute("alt", component.altText);
});

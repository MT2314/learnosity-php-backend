import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import QuoteBox from '../components/QuoteBox/QuoteBox';

// Setup/teardown
// https://reactjs.org/docs/testing-recipes.html#setup--teardown
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

// Mock props/data
const mockProps = {
   name : "QuoteBox",
   quoteBoxBody : {"blocks":[{"key":"d3ktl","text":"Polkaroo","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},
   quoteBoxCitation : {"blocks":[{"key":"8abs2","text":"Bibble","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}
};

describe('QuoteBox', () => {
   it('renders QuoteBox without any given data', () => {
      render(<QuoteBox />);
      
      expect(screen.getByTestId('quoteBox')).toBeInTheDocument();
      expect(screen.getByTestId('quotes')).toBeInTheDocument();
      expect(screen.getByTestId('quoteBoxBody')).toBeInTheDocument();
      expect(screen.getByTestId('quoteBoxCitation')).toBeInTheDocument();
   });

   it('renders QuoteBox with given data', () => {
      render(
      <QuoteBox
         quoteBoxBody={mockProps.quoteBoxBody}
         quoteBoxCitation={mockProps.quoteBoxCitation}
      />);

      expect(screen.getByTestId('quoteBoxBody')).toHaveTextContent('Polkaroo');
      expect(screen.getByTestId('quoteBoxBody')).not.toHaveTextContent('Humpty');
      expect(screen.getByTestId('quoteBoxCitation')).toHaveTextContent('Bibble');
      expect(screen.getByTestId('quoteBoxCitation')).not.toHaveTextContent('Dumpty');
   });
});
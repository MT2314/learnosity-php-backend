import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import QuoteBox from '../QuoteBox/QuoteBox';

describe('QuoteBox', () => {
   it('renders QuoteBox', () => {
      render(<QuoteBox />);
      
      expect(screen.getByPlaceholderText('Type citation here')).toBeInTheDocument();
   });

});
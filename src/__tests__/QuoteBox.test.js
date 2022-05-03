import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import QuoteBox from '../components/QuoteBox/QuoteBox';

describe('QuoteBox', () => {
   it('renders QuoteBox', () => {
      render(<QuoteBox />);
      
      expect(screen.getByText('Type citation here')).toBeInTheDocument();
   });

});
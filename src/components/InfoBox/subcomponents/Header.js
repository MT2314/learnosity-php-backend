import React, { useCallback, useContext } from 'react';
// MUI/@emotion imports
import styled from '@emotion/styled';
// ? Context
import { InfoBoxContext } from '../InfoBoxContext';

const StyledHeaderInput = styled('input')({
  fontSize: '2.125rem',
  fontWeight: '500',
  lineHeight: '2.5rem',
  color: '#232323',
  width: '100%',
  background: '#FAFAFA',
  border: 'none',

  '&::placeholder': {
    color: '#232323',
  },

  '&:focus': {
    outline: 'none',

    '&::placeholder': {
      color: 'rgba(0, 0, 0, 0.12)',
    },
  },
});
const Label = () => {
  const [state, dispatch] = useContext(InfoBoxContext);

  const handleHeaderChange = useCallback((e) => {
    dispatch({
      func: 'CHANGE_HEADER',
      header: e.target.value,
    });
  }, []);

  return (
    <StyledHeaderInput
      type="text"
      value={state.infoBoxHeader}
      onChange={handleHeaderChange}
      placeholder="Type your header here"
      aria-label="InfoBox header"
    />
  );
};

export default Label;

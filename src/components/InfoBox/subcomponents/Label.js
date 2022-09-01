import React, { useCallback, useContext } from 'react';
// MUI/@emotion imports
import styled from '@emotion/styled';
// ? Context
import { InfoBoxContext } from '../InfoBoxContext';

const StyledLabelInput = styled('input')({
  fontSize: '0.875rem',
  fontWeight: '400',
  lineHeight: '1.25rem',
  color: '#636363',
  width: '100%',
  background: '#FAFAFA',
  letterSpacing: '0.009375rem',
  border: 'none',

  '&::placeholder': {
    color: '#636363',
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

  console.log(state);

  const handleLabelChange = useCallback((e) => {
    dispatch({
      func: 'CHANGE_LABEL',
      label: e.target.value,
    });
  }, []);

  return (
    <StyledLabelInput
      type="text"
      onChange={handleLabelChange}
      value={state.infoBoxLabel}
      placeholder="Type your label here"
      aria-label="InfoBox label"
    />
  );
};

export default Label;

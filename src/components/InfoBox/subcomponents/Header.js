import React, { useCallback, useContext } from 'react';
// MUI/@emotion imports
import styled from '@emotion/styled';
// ? Context
import { InfoBoxContext } from '../InfoBoxContext';
import { TextareaAutosize } from '@material-ui/core';
import PropTypes from 'prop-types';

const StyledHeaderInput = styled(TextareaAutosize)({
  width: '650px',
  height: '40px',
  margin: 0,
  padding: 0,
  border: 'none',
  resize: 'none',
  lineHeight: '40px',
  background: '#FAFAFA',
  fontFamily: `"Inter", sans-serif`,
  fontSize: '34px',
  fontWeight: '500',
  color: 'rgba(35, 35, 35, 1)',
  '&::placeholder': {
    color: 'rgba(35, 35, 35, 1)',
  },
  '&:focus': {
    outline: 'none',
    '&::placeholder': {
      color: 'rgba(0, 0, 0, 0.12)',
    },
  },
});
const Header = ({ setDisableToolbar }) => {
  const [state, dispatch] = useContext(InfoBoxContext);

  const handleHeaderChange = useCallback((e) => {
    dispatch({
      func: 'CHANGE_HEADER',
      header: e.target.value,
    });
  }, []);

  return (
    <StyledHeaderInput
      name="infoBoxHeader"
      role={'header-textbox'}
      aria-label="info box header input"
      placeholder="Type your header here"
      aria-multiline="true"
      value={state.infoBoxHeader}
      onChange={handleHeaderChange}
      onFocus={() => {
        setDisableToolbar(true);
      }}
      onBlur={() => {
        setDisableToolbar(false);
      }}
    />
  );
};

Header.propTypes = {
  setDisableToolbar: PropTypes.func.isRequired,
};

export default Header;
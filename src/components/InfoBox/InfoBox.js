import React, { useState, useRef } from 'react';
// MUI/@emotion imports
import { Paper, NativeSelect } from '@mui/material';
import { TextareaAutosize } from '@material-ui/core';
import styled from '@emotion/styled';
// ?Provider
import { InfoBoxProvider } from './InfoBoxContext';
// Component imports
import InfoBoxToolbar from './toolbar/InfoBoxToolbar';
import Label from './subcomponents/Label';
import Header from './subcomponents/Header';
// import { InfoBoxBody } from "./subcomponents/InfoBoxBody";
// Hook/utilities imports
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
// Icon imports
import { defaultIcon } from './icons/infoBoxIcons';
// Localization import
import { useTranslation, Trans } from 'react-i18next';

// Default props
export const defaultProps = {
  infoBoxIcon: '',
  infoBoxLabel: '',
  infoBoxHeader: '',
  infoBoxBody: null,
};

// Styled components begin
const StyledPaper = styled(Paper)({
  background: 'rgb(236, 236, 236)',
  height: '227px',
  width: '968px',
  fontFamily: `"Inter", sans-serif`,
  padding: '40px 104px',
  display: 'flex',
  background: '#FAFAFA',
});

const StyledTextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '650px',
  marginLeft: '2.029rem',
});

const StyledBodyTextArea = styled(TextareaAutosize)({
  fontFamily: `"Inter", sans-serif`,
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5rem',
  letterSpacing: '0.009375rem',
  color: '#232323',
  width: '100%',
  minHeight: '72px',
  marginTop: '0.9375rem',
  background: '#FAFAFA',
  border: 'none',
  resize: 'none',

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

// InfoBox component
const InfoBox = ({ infoBoxState = defaultProps, setProp = () => {} }) => {
  // Localization
  const { t } = useTranslation();

  const [showToolbar, setShowToolbar] = useState(false);

  const infoBoxRef = useRef();

  const StyledToolbarContainer = styled('div')({
    display: showToolbar ? 'block' : 'none',
    minHeight: '2.5rem',
    maxHeight: '2.5rem',
    position: 'fixed !important',
    top: '80px !important',
    left: '50% !important',
    transform: 'translateX(-50%) !important',
    zIndex: '1000',
    justifyContent: 'center !important',
    backgroundColor: '#fff !important',
  });

  useOnClickOutside(infoBoxRef, () => {
    setShowToolbar(false);
  });

  const handleOnFocus = (e) => {
    const relatedTarget = e.relatedTarget || document.activeElement;
    if (relatedTarget || e.currentTarget.contains(relatedTarget)) {
      setShowToolbar(true);
    }
  };

  const handleOnBlur = (e) => {
    const relatedTarget = e.relatedTarget || document.activeElement;
    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
      setShowToolbar(false);
    }
  };

  return (
    <InfoBoxProvider infoBoxState={infoBoxState} setProp={setProp}>
      <StyledPaper
        aria-label="Info Box"
        data-testid="infoBox-container"
        ref={infoBoxRef}
        onClick={() => {
          setShowToolbar(true);
        }}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      >
        <StyledToolbarContainer>
          <InfoBoxToolbar />
        </StyledToolbarContainer>
        <div>{defaultIcon}</div>
        <StyledTextContainer>
          <Label />
          <Header />
          <StyledBodyTextArea
            name="infoBoxBody"
            aria-label="InfoBox body"
            aria-multiline="true"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
        </StyledTextContainer>
      </StyledPaper>
    </InfoBoxProvider>
  );
};

export default InfoBox;

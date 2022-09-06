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
// Icons
import { iconDropdownOptions } from './icons/infoBoxIcons';

import './styles/infoBox.scss';

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
  marginTop: '15px',
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

const StyledToolbarContainer = styled('div')({
  display: 'flex',
  minHeight: '2.5rem',
  maxHeight: '2.5rem',
  position: 'fixed',
  top: '80px',
  left: '41.5%',
  transform: 'translateX(-50%)',
  zIndex: 1000,
  justifyContent: 'center',
  backgroundColor: '#fff',
});

// InfoBox component
const InfoBox = ({ infoBoxState = defaultProps, setProp = () => {} }) => {
  // Localization
  const { t } = useTranslation();

  const [showToolbar, setShowToolbar] = useState(false);
  const [disableToolbar, setDisableToolbar] = useState(false);

  const [selectedIcon, setSelectedIcon] = useState(null);

  const infoBoxRef = useRef();

  useOnClickOutside(infoBoxRef, () => {
    setShowToolbar(false);
  });

  return (
    <InfoBoxProvider infoBoxState={infoBoxState} setProp={setProp}>
      <StyledPaper
        aria-label="Info Box"
        data-testid="infoBox-container"
        ref={infoBoxRef}
      >
        <div className={showToolbar ? 'show-tabtoolbar' : 'hide-tabtoolbar'}>
          <InfoBoxToolbar
            disableToolbar={disableToolbar}
            setSelectedIcon={setSelectedIcon}
          />
        </div>

        <div>
          {selectedIcon ? iconDropdownOptions[selectedIcon].icon : defaultIcon}
        </div>
        <StyledTextContainer
          onClick={() => {
            setShowToolbar(true);
          }}
          onFocus={() => setShowToolbar(true)}
        >
          <Label setDisableToolbar={setDisableToolbar} />
          <Header setDisableToolbar={setDisableToolbar} />
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

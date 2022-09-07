import styled from '@emotion/styled';

export const ReactQuillContainer = styled('div')(({ theme }) => ({
  '& .ql-container': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: '40px 104px',
    minHeight: '100px',
  },
  '& .ql-editor': {
    minHeight: '96px',
    padding: '0 15px',
    border: `none`,
    borderRadius: `none`,
    boxShadow: `none`,
    color: 'rgba(35, 35, 35, 1)',
    background: '#ffffff',
    fontWeight: 400,
    fontSize: '16px',
    fontFamily: ['Inter', 'sans-serif'].join(','),
    letterSpacing: '0.15px',
    letterHeight: '24px',
  },
  '& .ql-editor.ql-blank::before': {
    padding: '0px 104px',
  },
  '& .ql-toolbar .MuiPaper-root': {
    backgroundColor: '#fff',
  },
}));

export default ReactQuillContainer;

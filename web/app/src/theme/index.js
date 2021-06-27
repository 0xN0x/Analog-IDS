import { createMuiTheme } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#23272A',
      paper: '#2C2F33',
    },
    primary: {
      contrastText: '#FFFFFF',
      main: '#E5B030'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#99AAB5',
      error: '#F44336',
      action: '#99AAB5'
    }
  },
  zIndex: {
    backdrop: 1252,
    modal: 1251,
    drawer: 1250,
    appBar: 1249,
  },
  shadows,
  typography,
  overrides: {
    MuiSvgIcon: {
      root: {
        color: '#99AAB5'
      }
    }
  }
});

export default theme;

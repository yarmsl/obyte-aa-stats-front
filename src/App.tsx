import { ReactElement, useMemo } from 'react';
import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { useAppSelector } from 'store';
import SnackStack from 'UI/atoms/SnackStack/SnackStack';
import { darkModeSelector } from 'store/UI';
import ModalStack from './UI/atoms/ModalStack/ModalStack';
import Router from './Router';
import { theme } from './UI/theme';

const App = (): ReactElement => {
  const darkMode = useAppSelector(darkModeSelector);
  const currentTheme = useMemo(() => createTheme(theme(darkMode)), [darkMode]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <SnackStack />
        <ModalStack />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ThemePrimary } from '@styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'Routes/AppRouter';
import { AuthContextProvider } from '@lib/Context/AuthContext';
import Sidebar from '@components/Shared/SideBar/Sidebar';

const App = () => {
  const theme = createTheme(ThemePrimary);
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <BrowserRouter>
          <CssBaseline />
          <Sidebar />
          <AppRouter />
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
